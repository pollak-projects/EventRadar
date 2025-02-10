import express from 'express';
import { listAllGroup, addGroup, deleteGroup, updateGroup } from '../services/group.service.js';

const router = express.Router();

router.get("/getAll", async (req, res) => {
    const data = await listAllGroup();
    res.status(200).json(data);
})

router.post("/add", async (req, res) => {
    const { neve } = req.body;

    await addGroup(neve).then(() => {
        res.status(201).json({
            message: "Data successfully inserted"
        })
    }).catch(() => {
        res.status(409).json({
            message: "Duplicated data"
        })
    })
})

router.delete("/delete", async (req, res) => {
    const { neve } = req.body;

    await deleteGroup(neve);

    res.status(204).json({
        message: "Data successfully deleted"
    })
})

router.put("/update", async (req, res) =>{
    const { neve, ujnev } = req.body;

    await updateGroup(neve, ujnev);

    res.status(200).json({
        message: "Data successfully updated"
    })
})

export { router as groupController };