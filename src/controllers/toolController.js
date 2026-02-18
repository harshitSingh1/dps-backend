import Tool from "../models/Tool.js";

export const getTools = async (_req, res) => {
  try {
    const tools = await Tool.find();
    res.json({ success: true, data: tools });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
