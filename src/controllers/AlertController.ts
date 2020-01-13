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
    const { keyword, email, interval } = req.body;
    const intervalAccepted = [2, 10, 30];
    if (!keyword) {
      return res.status(400).json({
        message: "Keyword is required"
      });
    }
    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }
    if (!interval) {
      return res.status(400).json({
        message: "Interval is required"
      });
    }
    if (!intervalAccepted.includes(interval)) {
      return res.status(400).json({
        message: "Invalid interval, value must be one of (2,10,30)"
      });
    }

    const alertExists = await AlertModel.findOne({ keyword, email });
    if (alertExists) {
      return res.status(400).json({
        message: "Alert already created for this keyword"
      });
    }

    const alert = await AlertModel.create({
      keyword,
      email,
      interval
    });

    return res.status(201).json(alert);
  }
}

export default new AlertController();
