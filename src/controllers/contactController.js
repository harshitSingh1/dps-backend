import nodemailer from "nodemailer";
import Contact from "../models/Contact.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
});


export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save to MongoDB
    const savedContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email to YOU (admin)
    await transporter.sendMail({
      from: `"DailyPuzzleSolve Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `📩 New Contact: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
        <hr/>
        <small>Saved in MongoDB ✔</small>
      `,
    });

    // Auto reply to user (professional touch)
    await transporter.sendMail({
      from: `"DailyPuzzleSolve" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your message ✔",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting us. We received your message and will reply soon.</p>
        <br/>
        <p><b>Your message:</b></p>
        <p>${message}</p>
        <br/>
        <p>— Team DailyPuzzleSolve</p>
      `,
    });

    return res.json({
      success: true,
      message: "Message saved & email sent",
      data: savedContact,
    });

  } catch (error) {
    console.error("Contact error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};
