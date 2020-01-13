import AlertModel from "./../models/AlertModel";
import Mail from "../lib/Mail";
import EbayService from "./../lib/eBay";

class Schedule {
  constructor() {
    this.sendAlert();
  }

  private async sendAlert() {
    const twoMinutesAlerts = await AlertModel.find({
      interval: 2
    });
    const tenMinutesAlerts = await AlertModel.find({
      interval: 10
    });
    const thirtyMinutesAlerts = await AlertModel.find({
      interval: 30
    });

    setTimeout(async () => {
      for (const alert of twoMinutesAlerts) {
        const keyword = await alert.get("keyword");
        const result = await EbayService.findItemByKeywords({
          keywords: keyword
        });

        await Mail.sendMail({
          subject: "New alert for you",
          to: `${alert.get("email")}`,
          template: "alert",
          context: {
            keyword,
            result
          }
        });
      }
    }, 60000 * 2);
  }
}

export default new Schedule();
