// CRUD in Controller, + Service
// regisztráció(POST), bejelentkezés(POST), jelszó visszaállítás(GET),
// név és email változtatás(PUT), fiók törlés(DELETE)

import express from "express";
//import { transporter } from "../services/emailsender.js";


import {
  forgotPassword,
  userUpdate,
  userDelete,
  GetAllUsers,
  Groups,
} from "../services/user.service.js";

const router = express.Router();



router.get("/getAll", async (req, res) => {
  try {
    const users = await GetAllUsers();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// bejelentkezés

// jelszó visszaállítás
router.get("/forgot-password", async (req, res) => {
  const { id } = req.body;
  try {
    const user = await forgotPassword(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// név és email változtatás
router.put("/update", async (req, res) => {
  const { id, username, email, groupNeve, password } = req.body;
  try {
    const user = await userUpdate(id, username, email, groupNeve ,password, );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// fiók törlés
router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    const user = await userDelete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/getGroups", async (req, res) => {
  try {
    const groups = await Groups();
    res.status(200).json(groups);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
/*
router.post("/send-email", async (req, res) => {
  try {
    const { id, nev, subject, email, message } = req.body; // Destructure and retrieve data from request body.

    // Validate required fields.
    if (!nev || !subject || !email || !message || !id) {
      return res
        .status(400)
        .json({ status: "error", message: "Missing required fields" });
    }

    // Prepare the email message options.
    const mailOptions = {
      from: process.env.SENDER_EMAIL, // Sender address from environment variables.
      to: `${nev} <${email}>`, // Recipient's name and email address.
      replyTo: process.env.REPLY_TO, // Sets the email address for recipient responses.
      subject: subject, // Subject line.
      text: message, // Plaintext body.
    };

    // Send email and log the response.
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res
      .status(200)
      .json({ status: "success", message: await forgotPassword(id) });
  } catch (err) {
    // Handle errors and log them.
    console.error("Error sending email:", err);
    res.status(500).json({
      status: "error",
      message: "Error sending email, please try again.",
    });
  }
});
*/
export { router as userController };
