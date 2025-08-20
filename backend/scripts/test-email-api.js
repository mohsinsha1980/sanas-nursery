import { readFileSync } from "fs";
import handlebars from "handlebars";
import { SendMailClient } from "zeptomail";
import dotenv from "dotenv";
dotenv.config({ path: "/.env" });
const { compile } = handlebars;
import path from "path";
const templateFile = readFileSync(
  path.join(process.cwd(), "/backend/templates/test.html"),
  {
    encoding: "utf-8",
  }
);
const template = compile(templateFile);

const replacements = {
  first_name: "Vaibhav",
  last_name: "Bokare",
};

const htmlToSend = template(replacements);

const url = "api.zeptomail.in/";
const token =
  "Zoho-enczapikey PHtE6r0NRL+53mIt8RgH4vGwE8CtNIkn9L5kK1ZOs4lGDaRQHE0BqtwukjO3/RkoB/MUQfbOyt1rsr2asLmGIWfkNW4aCWqyqK3sx/VYSPOZsbq6x00btl4ZdE3bUIDtd9Ru1iXQvNrSNA==";

const client = new SendMailClient({
  url,
  token,
});

const sendEmail = async () => {
  try {
    await client.sendMail({
      from: {
        address: "noreply@sanasnursery.com",
        name: "Sanas Nursery",
      },
      to: [
        {
          email_address: {
            address: "bokarevk2001@gmail.com",
            name: "Info",
          },
        },
      ],
      subject: "Sanas Nursery : Reset password",
      htmlbody: htmlToSend,
      // attachments: [
      //   {
      //     content: fs.readFileSync(
      //       __dirname + "/invoice/2facca7a-2902-4ac9-a742-f6fc5de70fa4.pdf",
      //       {
      //         encoding: "base64",
      //       }
      //     ),
      //     mime_type: "application/pdf",
      //     name: "test.pdf",
      //   },
      // ],
    });

    console.log("Email send successfully!");
  } catch (mailErr) {
    console.log("mailErr", mailErr);
  }
};

sendEmail();
