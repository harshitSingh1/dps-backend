import Contact from "../models/Contact.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    // 1️⃣ Save to MongoDB
    const savedContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // 2️⃣ Send Email via Resend
    try {
      await resend.emails.send({
        from: "DailyPuzzleSolve <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL,
        subject: `📩 New Contact: ${subject}`,
        html: `
          <h2>New Contact Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b></p>
          <p>${message}</p>
        `,
      });

      console.log("✅ Email sent via Resend");
    } catch (mailError) {
      console.error("❌ Email failed:", mailError.message);
    }

    return res.json({
      success: true,
      message: "Message saved successfully",
      data: savedContact,
    });
  } catch (err) {
    console.error("Contact error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
