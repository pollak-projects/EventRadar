import { PrismaClient } from "@prisma/client";
import express from "express";
import {
  createMessage,
  getAllMessages,
  deleteMessage,
  getMessagesByUserId,
} from "../services/chatmessages.service.js"; 
import {io} from "../index.js";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/sendMessage", async (req, res) => {
  const { userId, message } = req.body;
  try {
    const newMessage = await createMessage(userId, message);

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { username: true, profilkep: true },
    });
    newMessage.userName = user.username;
    newMessage.userImage = user.profilkep || '';

    io.emit("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getMessages", async (req, res) => {
  try {
    const messages = await prisma.messages.findMany({
      include: {
        user: {
          select: {
            username: true,    
            profilkep: true, 
          }
        }
      }
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getMessagesByUser/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  try {
    const messages = await getMessagesByUserId(userId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/deleteMessage/:messageId", async (req, res) => {
  const messageId = Number(req.params.messageId);
  try {
    await deleteMessage(messageId);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { router as chatMessageController };