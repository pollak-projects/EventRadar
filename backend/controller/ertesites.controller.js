import express from "express";

import {
  notiUpdate,
  notiDelete,
  GetAllNoti,
  getNotiById,
} from "../services/ertesites.service.js";

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    const users = await GetAllNoti();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  const { ertesites_id, esemenyek_id, user_id, message } = req.body;
  try {
    const event = await notiUpdate(
      ertesites_id,
      esemenyek_id,
      user_id,
      message
    );
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const event = await notiDelete(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/getId", async (req, res) => {
  const { ertesites_id } = req.body;
  try {
    const event = await getNotiById(ertesites_id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export { router as ertesitesController}
