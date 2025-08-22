import { SendMailClient } from "zeptomail";
import config from "./env-config.js";

const mailClient = new SendMailClient({
  url: "api.zeptomail.in/",
  token: config.ZEPTO_API_KEY,
});

export default mailClient;
