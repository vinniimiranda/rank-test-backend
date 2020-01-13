import express from "express";
import mongoose from "mongoose";

import routes from "./routes";

class AppServer {
  server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  private routes() {
    this.server.use(routes);
  }

  private middlewares() {
    this.server.use(express.json());
  }

  private database(): void {
    mongoose.connect("mongodb://localhost:27017/ebay", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
}
export default new AppServer().server;