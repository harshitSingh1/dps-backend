import Shop from "../models/Shop.js";

export const getShops = async (_req, res) => {
  try {
    const shops = await Shop.find();
    res.json({ success: true, data: shops });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
