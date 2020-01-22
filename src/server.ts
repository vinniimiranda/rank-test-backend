import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import BullBoard from "bull-board";

import routes from "./routes";
import "./schedule/Schedule";
import { mailQueue } from "./lib/Queue";

class AppServer {
  server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.database();
    this.bullBoard();
  }

  private routes() {
    this.server.use(routes);
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private bullBoard() {
    BullBoard.setQueues(mailQueue);
    this.server.use("/admin/queues", BullBoard.UI);
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
