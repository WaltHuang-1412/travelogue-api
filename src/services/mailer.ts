import nodemailer from 'nodemailer';
import config from '../config/index';
import { ITransporte } from '../interfaces/IEmail';
export default class Mail {
  private mailTransport: any;
  constructor() {
    this.mailTransport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: config.emails.SMTP.account,
        pass: config.emails.SMTP.password,
      },
    });
  }
  async send(
    transport: ITransporte = {
      from: '"Test 👻" <test@cloud-interactive.com>',
      to: 'walter.huang@cloud-interactive.com',
      subject: 'Hello',
      text: 'Hello world?',
      html: '<b>Hello world?</b>',
    },
  ) {
    // send mail with defined transport object
    let info = await this.mailTransport.sendMail({
      ...transport,
    });

    console.log('Message sent: %s', info.envelope);
  }
}
