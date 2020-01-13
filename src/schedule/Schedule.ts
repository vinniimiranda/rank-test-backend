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

    setInterval(async () => {
      for (const alert of twoMinutesAlerts) {
        const keyword = await alert.get("keyword");
        const search = await EbayService.findItemByKeywords({
          keywords: keyword
        });

        await Mail.sendMail({
          subject: "New alert for you",
          to: `${alert.get("email")}`,
          text: JSON.stringify(search)
        });
      }
    }, 10000);
  }
}

export default new Schedule();
