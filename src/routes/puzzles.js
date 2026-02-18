import express from "express";
import Puzzle from "../models/Puzzle.js";

const router = express.Router();

/**
 * GET /api/puzzles
 * GET /api/puzzles?game=pinpoint
 */
router.get("/", async (req, res) => {
  try {
    const { game } = req.query;

    let query = {};

    // If game provided → filter by heading keyword
    if (game) {
      const map = {
        pinpoint: "Pinpoint",
        queens: "Queens",
        tango: "Tango",
        crossclimb: "Crossclimb",
        zip: "Zip",
      };

      const keyword = map[game.toLowerCase()];

      if (keyword) {
        query = { heading: { $regex: keyword, $options: "i" } };
      }
    }

    const puzzles = await Puzzle.find(query)
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    res.json({
      success: true,
      data: puzzles,
    });
  } catch (error) {
    console.error("Puzzles fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch puzzles",
    });
  }
});

export default router;
