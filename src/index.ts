import { config } from "dotenv";
import EbayService from "./eBay";
config({
  path: ".env"
});

const ebay = new EbayService();

ebay
  .findItemByKeywords({ keywords: "Harry potter" })
  .then(data => console.log(data));
