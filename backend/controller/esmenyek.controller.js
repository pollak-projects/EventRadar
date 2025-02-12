import express from "express";

import {
  eventUpdate,
  eventDelete,
  GetAllEvent,
  getAllEventById,
} from "../services/esemenyek.service.js";

const router = express.Router();

router.get("/getAll", async (req, res) => {
    try {
        const users = await GetAllEvent();
        res.status(201).json(users);
    }catch (error) {
        res.status(400).json({message:  error.message})
    }
});

router.put("/update", async (req, res) => {
    const { id, esemeny_nev, leiras, helyszin, esemeny_date } = req.body;
    try {
        const event = await eventUpdate(id, esemeny_nev, leiras, helyszin, esemeny_date)
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete("/delete", async (req, res) => {
    const { id } = req. body;
    try {
        const event = await eventDelete(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

router.get("/getId", async (req, res) =>{
    const { id } = req.body;
    try {
      const event = await getAllEventById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error.message);
    }
})