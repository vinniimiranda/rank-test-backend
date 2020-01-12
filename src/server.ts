import express from "express";

import routes from "./routes";

class AppServer {
  server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private routes() {
    this.server.use(routes);
  }

  private middlewares() {
    this.server.use(express.json());
  }
}
export default new AppServer().server;
