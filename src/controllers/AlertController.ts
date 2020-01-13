import { Request, Response, Router } from "express";
import AlertModel from "./../models/AlertModel";

class AlertController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes() {
    this.router.post("/", this.store);
    return this.router;
  }

  private async store(req: Request, res: Response): Promise<any> {
    const { keyword, interval } = req.body;

    if (!keyword) {
      return res.status(400).json({
        message: "keyword is required"
      });
    }
    if (!interval) {
      return res.status(400).json({
        message: "interval is required"
      });
    }

    const alertExists = await AlertModel.findOne({ keyword });

    if (alertExists) {
      return res.status(400).json({
        message: "Alert already created for this keyword"
      });
    }

    const alert = await AlertModel.create({
      keyword,
      interval
    });

    return res.status(201).json(alert);
  }
}

export default new AlertController();
