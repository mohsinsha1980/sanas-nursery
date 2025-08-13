import { NextRequest, NextResponse } from "next/server";
import { SendMailClient } from "zeptomail";

const url = "api.zeptomail.in/";
const token = process.env.ZEPTO_API_KEY;

let client = new SendMailClient({ url, token });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const ZEPTO_FROM_EMAIL =
      process.env.ZEPTO_FROM_EMAIL || "noreply@sanasnursery.com";
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "sanasnursery@gmail.com";

    const emailContent = {
      from: {
        address: ZEPTO_FROM_EMAIL,
        name: "Sanas Nursery",
      },
      to: [
        {
          email_address: {
            address: ADMIN_EMAIL,
            name: "Sanas Nursery",
          },
        },
      ],
      subject: `New Contact Form Submission: ${subject}`,
      htmlbody: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #ea580c;">New Contact Form Submission</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #475569; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone/WhatsApp:</strong> ${phone}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #ea580c;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #16a34a;">
            <p style="margin: 0; color: #166534; font-size: 14px;">
              <strong>Action Required:</strong> Please respond to this inquiry within 24 hours. 
              You can contact the customer via email, phone, or WhatsApp.
            </p>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          <p style="color: #64748b; font-size: 12px; text-align: center;">
            This email was sent from the Sanas Nursery contact form on the website.
          </p>
        </div>
      `,
      textbody: `
New Contact Form Submission

Contact Details:
Name: ${name}
Email: ${email}
Phone/WhatsApp: ${phone}
Subject: ${subject}

Message:
${message}

Action Required: Please respond to this inquiry within 24 hours. You can contact the customer via email, phone, or WhatsApp.

---
This email was sent from the Sanas Nursery contact form on the website.
      `,
    };

    client
      .sendMail(emailContent)
      .then(() => {
        return NextResponse.json(
          { message: "Message sent successfully" },
          { status: 200 }
        );
      })
      .catch(() => {
        throw new Error("Failed to send email");
      });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
