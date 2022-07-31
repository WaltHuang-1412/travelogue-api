import SequelizeLoader from '../loaders/sequelize';
import { Sequelize, Model } from 'sequelize';
import Logger from '../loaders/logger';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { v1 as uuidv1 } from 'uuid';
import UserAccountModel from '../db/models/userAccount';
import UserVerificationModel from '../db/models/userVerification';
import config from '../config/index';
import { randomBytes, Certificate } from 'crypto';
import { IUserAccount, IUserAccountInputDTO } from '../interfaces/IUserAccount';
import { IUserVerification } from '../interfaces/IUserVerification';
import randomize from 'randomatic';

export default class Auth {
  private UserAccount: any;
  private UserVerification: any;
  private logger: any;
  private sequelize: Sequelize;
  constructor() {
    this.sequelize = SequelizeLoader();
    this.UserAccount = UserAccountModel(this.sequelize);
    this.UserVerification = UserVerificationModel(this.sequelize);
    this.logger = Logger;
  }
  async signUp(
    userAccountInputDTO: IUserAccountInputDTO,
  ): Promise<{ createUserAccount: IUserAccount; createUserVerification: IUserVerification }> {
    const t = await this.sequelize.transaction();
    try {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userAccountInputDTO.password, { salt });
      this.logger.silly('Creating user db record');
      const createUserAccount = await this.UserAccount.create(
        {
          ...userAccountInputDTO,
          no: uuidv1(),
          salt: salt.toString('hex'),
          password: hashedPassword,
        },
        { transaction: t },
      );
      const createUserVerification = await this.UserVerification.create(
        {
          userAccountId: createUserAccount.id,
          code: randomize('0', 6),
        },
        { transaction: t },
      );
      await t.commit();

      return { createUserAccount, createUserVerification };
    } catch (error) {
      this.logger.error(error);
      await t.rollback();
      throw error;
    }
  }
  async signIn(account: string, password: string): Promise<{ accessToken?: string; refreshToken?: string }> {
    try {
      const userRecord = await this.UserAccount.findOne({
        where: {
          account,
        },
      });
      if (!userRecord) throw new Error('User not registered');
      this.logger.silly('Checking password');
      const validPassword = await argon2.verify(userRecord.password, password);

      if (validPassword) {
        this.logger.silly('Password is valid!');
        this.logger.silly('Generating JWT');
        const accessToken = this.generateToken({ user: userRecord });
        const refreshToken = this.generateToken({ user: userRecord, lifeTime: 60 * 60 * 24 * 2 });
        return { accessToken, refreshToken };
      } else {
        throw new Error('Invalid Password');
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  async verifiation(account: string, code: number) {
    try {
      const userAccountRecord = await this.UserAccount.findOne({
        where: {
          account,
        },
      });
      const userVerificationRecord = await this.UserVerification.findOne({
        where: {
          userAccountId: userAccountRecord.id,
        },
      });
      if (userVerificationRecord.code != code) {
        userVerificationRecord.errorCount++;
        await userVerificationRecord.save();
        throw new Error('Invalid Code');
      }
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
  private generateToken({ user, lifeTime = 60 * 60 * 24 * 1 }: { user: IUserAccount; lifeTime?: number }) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + lifeTime);
    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        email: user.account,
        exp: exp.getTime() / 1000,
      },
      config.accessTokenSecret,
    );
  }
}
