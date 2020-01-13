import "dotenv/config";

import { mailQueue } from "./lib/Queue";
import AlertMail from "./jobs/AlertMail";

mailQueue.process(AlertMail.handle);
mailQueue.on("completed", () =>
  console.log("E-mail queue executed successfully")
);
