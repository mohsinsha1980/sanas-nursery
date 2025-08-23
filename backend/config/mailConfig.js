import { SendMailClient } from "zeptomail";
import { default as config } from "./env-config";

const mailClient = new SendMailClient({
  url: "api.zeptomail.in/",
  token: config.ZEPTO_API_KEY,
});

export default mailClient;
