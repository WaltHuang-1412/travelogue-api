import { Router, Request, Response } from 'express';
import { celebrate, Joi } from 'celebrate';
import Auth from '../../services/auth';
import Result from '../../services/result';
import Emailer from '../../services/mailer';
import Crypto from '../../services/crypto';
import { ITransport } from '../../interfaces/IEmail';
const emailer = new Emailer();
const route = Router();
const auth = new Auth();
const result = new Result();
const crypto = new Crypto();
export default async (app: Router) => {
  app.use('/user', route);
  route.get('/', async (req: Request, res: Response) => {
    res.send('Hello');
  });
  /**
   * @typedef SignIn
   * @property {string} account.required - Some email or phone - eg: eerwrewrwr@example.com
   * @property {string} password.required - Some password - eg: abcd12345
   */
  /**
   * This function comment is parsed by doctrine
   * @route POST /user/signin
   * @group User - Operations about user
   * @param {SignIn.model} content.body.required - the new point
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  route.post(
    '/sign-in',
    celebrate({
      body: Joi.object({
        account: Joi.string().required().email().max(100),
        password: Joi.string().required().trim().alphanum().min(8).max(12),
      }),
    }),
    async (req: Request, res: Response) => {
      try {
        const { body } = req;
        const { account, password } = body;
        const { accessToken, refreshToken } = await auth.signIn(account, password);
        res.json(result.success()({ accessToken, refreshToken })).status(200).end();
      } catch (error) {
        res.json(result.fail()(error));
      }
    },
  );
  /**
   * @typedef Signup
   * @property {string} name.required - Some email or phone - eg: TestName
   * @property {string} account.required - Some email or phone - eg: test@example.com
   * @property {string} password.required - Some password - eg: 12345678
   */
  /**
   * This function comment is parsed by doctrine
   * @route POST /user/signup
   * @group User - Operations about user
   * @param {Signup.model} content.body.required - the new point
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().max(100).trim(),
        account: Joi.string().required().trim().email().max(100),
        password: Joi.string().required().trim().alphanum().min(8).max(12),
      }),
    }),
    async (req: Request, res: Response) => {
      try {
        const { body } = req;
        const { name, account, password } = body;
        const { createUserAccount, createUserVerification } = await auth.signUp({ name, account, password });

        const transport: ITransport = {
          from: 'test@test.com',
          to: createUserAccount.account,
          subject: 'Test subject',
          text: 'Test text',
          html: `<div>verification code:${createUserVerification.code}</div><div>Account:${createUserAccount.account}</div>`,
        };
        emailer.send(transport);
        res.json(result.success()(createUserAccount)).status(200).end();
      } catch (error) {
        res.json(result.fail()(error));
      }
    },
  );

  /**
   * @typedef Verification
   * @property {string} account.required - Some email or phone - eg: test@example.com
   * @property {integer} code.required - Some password - eg: 12345678
   */
  /**
   * This function comment is parsed by doctrine
   * @route POST /user/verifiation
   * @group User - Operations about user
   * @param {Verification.model} content.body.required - the new point
   * @returns {object} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */

  route.post(
    '/verification',
    celebrate({
      body: Joi.object({
        name: Joi.string().max(100).trim(),
        account: Joi.string().required().trim().email().max(100),
        code: Joi.number().required(),
      }),
    }),
    async (req: Request, res: Response) => {
      try {
        const { body } = req;
        const { account, code } = body;
        await auth.verification(account, code);
        res.json().status(200).end();
      } catch (error) {
        res.json(result.fail()(error));
      }
    },
  );
};
