import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import puzzleRoutes from "./routes/puzzles.js";
import toolRoutes from "./routes/tools.js";
import shopRoutes from "./routes/shops.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/puzzles", puzzleRoutes);
app.use("/api/tools", toolRoutes);
app.use("/api/shops", shopRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (_req, res) => {
  res.send("DPS Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
