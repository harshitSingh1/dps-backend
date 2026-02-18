import Puzzle from "../models/Puzzle.js";

export const getPuzzles = async (req, res) => {
  try {
    const { game } = req.query;

    let query = {};
    if (game) {
      query = { gameType: new RegExp(game, "i") };
    }

    const puzzles = await Puzzle.find(query)
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({ success: true, data: puzzles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
