import { Request, Response, Router } from 'express';
import AlertModel from '../models/AlertModel';

class AlertController {
  private router = Router();

  constructor() {
    this.routes();
  }

  public routes(): Router {
    this.router.post('/', this.store);
    this.router.get('/', this.index);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
    return this.router;
  }

  private async store(req: Request, res: Response): Promise<Response> {
    const { keyword, email, interval } = req.body;
    const intervalAccepted = [2, 10, 30];
    if (!keyword) {
      return res.status(400).json({
        message: 'Keyword is required',
      });
    }
    if (!email) {
      return res.status(400).json({
        message: 'Email is required',
      });
    }
    if (!interval) {
      return res.status(400).json({
        message: 'Interval is required',
      });
    }
    if (!intervalAccepted.includes(interval)) {
      return res.status(400).json({
        message: 'Invalid interval, value must be one of (2,10,30)',
      });
    }

    const alertExists = await AlertModel.findOne({ keyword, email });
    if (alertExists) {
      return res.status(400).json({
        message: 'Alert already created for this keyword',
      });
    }

    const alert = await AlertModel.create({
      keyword,
      email,
      interval,
    });

    return res.status(201).json(alert);
  }

  private async index(req: Request, res: Response): Promise<Response> {
    const alerts = await AlertModel.find();

    return res.status(200).json(alerts);
  }

  private async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await AlertModel.findOneAndUpdate(id, { ...req.body });

    return res.status(204).json();
  }

  private async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await AlertModel.findByIdAndDelete(id);
    return res.status(204).json();
  }
}

export default new AlertController();
