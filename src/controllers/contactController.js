import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.json({ success: true, message: "Message sent" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
