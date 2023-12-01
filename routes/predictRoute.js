import express from "express";
import predictController from "../controllers/predictionController.js";
const router = express.Router();

router.get("/:news", predictController);

export default router;
