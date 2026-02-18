import express from "express";
import { getPuzzles } from "../controllers/puzzleController.js";

const router = express.Router();
router.get("/", getPuzzles);

export default router;
