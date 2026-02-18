import mongoose from "mongoose";

const puzzleSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  gameType: {
    type: String,
    enum: ["Pinpoint", "Queens", "Tango", "Crossclimb", "Zip"],
    required: true,
  },
  ytVideo: { type: String, default: "" },
  screenshots: [{ 
    type: String 
  }],
  createdAt: { type: Date, default: Date.now },
});

const Puzzle = mongoose.models.Puzzle || mongoose.model('Puzzle', puzzleSchema);

export default Puzzle;