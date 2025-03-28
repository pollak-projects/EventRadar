import express from "express";

import {
  eventUpdate,
  eventDelete,
  GetAllEvent,
  getAllEventById,
  CreateEvent,
  getEventByCreate,
} from "../services/esemenyek.service.js";

const router = express.Router();

router.get("/getAll", async (req, res) => {
  try {
    const events = await GetAllEvent();
    res.status(201).json(events);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  const {
    id,
    esemeny_nev,
    leiras,
    helyszin,
    esemeny_date,
    kezdetido,
    vegeido,
    kategoria
  } = req.body;
  try {
    const event = await eventUpdate(
      id,
      esemeny_nev,
      leiras,
      helyszin,
      esemeny_date,
      kezdetido,
      vegeido,
      kategoria
    );
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      user,
      esemeny_nev,
      leiras,
      helyszin,
      esemeny_date,
      kezdetido,
      vegeido,
      kategoria,
      foszam
    } = req.body;
    const event = await CreateEvent(
      user,
      esemeny_nev,
      leiras,
      helyszin,
      esemeny_date,
      kezdetido,
      vegeido,
      kategoria,
      foszam
    );
    res.status(201).json(event);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const event = await eventDelete(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get(`/getId/:id`, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const event = await getAllEventById(id);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get(`/getEventCreate/:id`, async (req, res) => {
  const user = Number(req.params.id);
  try {
    const event = await getEventByCreate(user);
    res.status(200).json(event)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

export { router as esemenyekController };
