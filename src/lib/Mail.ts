import nodemailer from "nodemailer";
import { resolve } from "path";
import exphbs from "express-handlebars";
// @ts-ignore;
import nodemailerhbs from "nodemailer-express-handlebars";

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
    this.configureTemplates();
  }

  private configureTemplates() {
    const viewPath = resolve(__dirname, "..", "views", "emails");
    this.transporter.use(
      "compile",
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, "layouts"),
          partialsDir: resolve(viewPath, "partials"),
          defaultLayout: "default",
          extname: ".hbs"
        }),
        viewPath,
        extName: ".hbs"
      })
    );
  }

  public sendMail(message: object) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    });
  }
}

export default new Mail();
