// @ts-ignore
import Ebay from "ebay-node-api";

class EbayService {
  public instance: any;

  constructor() {
    this.init();
    this.getAccessToken();
  }
  private async init() {
    this.instance = new Ebay({
      clientID: process.env.APP_ID,
      clientSecret: process.env.CLIENT_SECRET,
      body: {
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/oauth/api_scope"
      }
    });
  }

  private async getAccessToken() {
    try {
      const { access_token } = await this.instance.getAccessToken();
      // console.log(access_token);
    } catch (error) {
      // console.log("Error");
    }
  }

  public async findItemByKeywords({ keywords = "" }) {
    try {
      const data = await this.instance.findItemsByKeywords({
        keywords,
        sortOrder: "PricePlusShippingLowest", //https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
        pageNumber: 1,
        limit: 3,
        entriesPerPage: 3
      });

      const results = data[0].searchResult[0].item;
      return results;
    } catch (error) {}
  }
}

export default EbayService;
