import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import routes from "./routes";
import "./schedule/Schedule";

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
    this.server.use(cors());
    this.server.use(express.json());
  }

  private database(): void {
    const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
  }
}
export default new AppServer().server;
