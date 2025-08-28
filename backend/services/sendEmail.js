import handlebars from "handlebars";
import config from "../config/env-config.js";
import mailClient from "../config/mailConfig.js";
import { readHTMLFile } from "../lib/util.js";

const sendEmail = async ({
  templatePath,
  receiverEmail,
  subject,
  replacements,
}) => {
  return new Promise((resolve) => {
    readHTMLFile(templatePath, (readFileErr, html) => {
      if (readFileErr || !html) {
        return resolve({
          error: true,
          message: "Error reading email template",
        });
      }

      const template = handlebars.compile(html);
      const htmlToSend = template(replacements);

      try {
        mailClient.sendMail({
          from: {
            address: config.ZEPTO_FROM_EMAIL,
            name: "Sanas Nursery",
          },
          to: [
            {
              email_address: {
                address: receiverEmail,
                name: "Info",
              },
            },
          ],
          subject: subject,
          htmlbody: htmlToSend,
        });

        return resolve({
          error: false,
          message: "Email sent successfully!",
        });
      } catch (err) {
        return resolve({
          error: true,
          message: err.message,
        });
      }
    });
  });
};

export default sendEmail;
