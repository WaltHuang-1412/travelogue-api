import SequelizeWithMysql from '../db/mysql/index';
import { Sequelize, Model } from 'sequelize';
import Logger from '../loaders/logger';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { v1 as uuidV1 } from 'uuid';
import UserAccountModel from '../db/mysql/models/userAccount';
import UserVerificationModel from '../db/mysql/models/userVerification';
import config from '../config/index';
import { randomBytes, Certificate } from 'crypto';
import { IUserAccount, IUserAccountInputDTO } from '../types/interfaces/IUserAccount';
import { IUserVerification } from '../types/interfaces/IUserVerification';
import randomatic from 'randomatic';
function test(constructor: Function) {
  console.log('123 :>> ', 123);
  console.log('constructor :>> ', constructor);
}

@test
export default class Auth {
  private UserAccount: any;
  private UserVerification: any;
  private logger: any;
  private sequelizeWithMysql: Sequelize;

  constructor() {
    this.sequelizeWithMysql = SequelizeWithMysql();
    this.UserAccount = UserAccountModel(this.sequelizeWithMysql);
    this.UserVerification = UserVerificationModel(this.sequelizeWithMysql);
    this.logger = Logger;
  }

  async signUp(
    userAccountInputDTO: IUserAccountInputDTO,
  ): Promise<{ createUserAccount: IUserAccount; createUserVerification: IUserVerification }> {
    const t = await this.sequelizeWithMysql.transaction();
    try {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userAccountInputDTO.password, { salt });
      this.logger.silly('Creating user db record');
      const createUserAccount = await this.UserAccount.create(
        {
          ...userAccountInputDTO,
          no: uuidV1(),
          salt: salt.toString('hex'),
          password: hashedPassword,
        },
        { transaction: t },
      );
      const createUserVerification = await this.UserVerification.create(
        {
          userAccountId: createUserAccount.id,
          code: randomatic('0', 6),
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

  async verification(account: string, code: number) {
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
