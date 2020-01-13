import { Router, Request, Response } from "express";

import AlertController from "../controllers/AlertController";

class Routing {
  router: Router;
  constructor() {
    this.router = Router();
    this.router.get("/", (req: Request, res: Response) =>
      res.status(200).json({
        root: "Api root routes !!!"
      })
    );

    this.router.use("/alerts", AlertController.routes());
  }
}

export default new Routing().router;
