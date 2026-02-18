import mongoose from "mongoose";

const toolSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
   subheading: { type: String, index: true },
  image: { type: String },
  url: { type: String, required: true },
});

export default mongoose.model("Tool", toolSchema);
