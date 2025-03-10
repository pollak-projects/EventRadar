import express from "express";

import {
  RatingUpdate,
  RatingDelete,
  GetAllRating,
  GetRatingById,
} from "../services/ertekeles.service.js";

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    const users = await GetAllRating();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  const { ertekeles_id, rating, comment } = req.body;
  try {
    const event = await RatingUpdate(ertekeles_id, rating, comment);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete/:ertekeles_id", async (req, res) => {
  const { ertekeles_id } = req.params;
  try {
    const event = await RatingDelete(ertekeles_id);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/getId/:ertekeles_id", async (req , res) => {
  const { ertekeles_id } = req.params;
  try {
    const event = await GetRatingById(ertekeles_id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});


export { router as ertekelesController };