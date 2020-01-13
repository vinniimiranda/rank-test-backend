import { Request, Response, Router } from "express";

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

    return res.status(201).json({
      keyword,
      interval
    });
  }
}

export default new AlertController();
