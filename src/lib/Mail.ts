import nodemailer from "nodemailer";
import mailConfig from "../config/mail";

class Mail {
  private transporter: any;
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth
    });
  }

  public sendMail(message: object) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    });
  }
}

export default new Mail();
