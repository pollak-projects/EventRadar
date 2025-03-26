import express from "express";
import { GetReview, reviewSend } from "../services/contact.service.js";
import { reviewSender } from "../services/emailsender.service.js";

const router = express.Router();

router.post("/reviewsend", async (req, res) => {
  try {
    const { nev, email, uzenet } = req.body;
    await reviewSend(nev, email, uzenet);
    res.status(200).json(uzenet);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/getreview", async (req, res) => {
  try {
    await GetReview();
    res.status(200).json(uzenet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { router as contactController };
