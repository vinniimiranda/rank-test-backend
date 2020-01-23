import Ebay from 'ebay-node-api';
import 'dotenv/config';

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
        grant_type: 'client_credentials',
        scope: 'https://api.ebay.com/oauth/api_scope',
      },
    });
  }

  private async getAccessToken(): Promise<void> {
    try {
      await this.instance.getAccessToken();
    } catch (error) {
      console.log("Couldn't get Access Token");
    }
  }

  public async findItemByKeywords({ keywords }): Promise<any> {
    try {
      const data = await this.instance.findItemsByKeywords({
        keywords,
        sortOrder: 'PricePlusShippingLowest',
        pageNumber: 1,
        limit: 3,
        entriesPerPage: 3,
      });

      const results = data[0].searchResult[0].item.map(
        (item: {
          sellingStatus: { currentPrice: { [x: string]: any }[] }[];
        }) => ({
          ...item,
          price: item.sellingStatus[0].currentPrice[0].__value__,
        }),
      );
      return results;
    } catch (error) {
      // console.log(error);
    }
  }
}

export default new EbayService();
