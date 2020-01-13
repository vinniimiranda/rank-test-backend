import AlertModel from "./../models/AlertModel";
import EbayService from "./../lib/eBay";
import { mailQueue } from "../lib/Queue";

class Schedule {
  constructor() {
    this.createAlertsJob();
  }

  private async createAlertsJob() {
    setInterval(async () => {
      const alerts = await AlertModel.find({
        interval: 2
      });
      for (const alert of alerts) {
        const email = await alert.get("email");
        const keyword = await alert.get("keyword");
        const result = await EbayService.findItemByKeywords({
          keywords: keyword
        });

        await mailQueue.add({ email, keyword, result });
      }
    }, 60000 * 2);

    setInterval(async () => {
      const alerts = await AlertModel.find({
        interval: 10
      });
      for (const alert of alerts) {
        const email = await alert.get("email");
        const keyword = await alert.get("keyword");
        const result = await EbayService.findItemByKeywords({
          keywords: keyword
        });

        await mailQueue.add({ email, keyword, result });
      }
    }, 60000 * 10);

    setInterval(async () => {
      const alerts = await AlertModel.find({
        interval: 30
      });
      for (const alert of alerts) {
        const email = await alert.get("email");
        const keyword = await alert.get("keyword");
        const result = await EbayService.findItemByKeywords({
          keywords: keyword
        });

        await mailQueue.add({ email, keyword, result });
      }
    }, 60000 * 30);
  }
}

export default new Schedule();
