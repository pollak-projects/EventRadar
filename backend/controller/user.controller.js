import express from "express";
//import { transporter } from "../services/emailsender.js";
import {
  imageSaveToDB,
  imageGetFromDB,
  jelentkezes,
  esemenyUser,
  already,
} from "../services/user.service.js";

import {
  forgotPassword,
  userUpdate,
  userDelete,
  GetAllUsers,
  Groups,
  getUsersById,
  passwordUpdate
} from "../services/user.service.js";
import { passwordReset } from "../services/emailsender.service.js";

const router = express.Router();

router.get(`/getUserById/:id`, async (req, res) => {
  const id = Number(req.params.id);
  console.log("Received ID:", req.params.id, "Parsed ID:", id);
  try {
    const users = await getUsersById(id);
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const users = await GetAllUsers();
    res.status(201).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await forgotPassword(email);
    res.status(200).json(user);
    await passwordReset(email);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update", async (req, res) => {
  const { id, username, email, groupNeve} = req.body;
  try {
    const user = await userUpdate(id, username, email, groupNeve);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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

router.post("/postImages", async (req, res) => {
  const { file, id } = req.body;
  console.log(file);
  const data = await imageSaveToDB(file, id);
  res.status(200).json(data);
});

router.get("/getImages", async (req, res) => {
  const { kapottTipus } = req.query;
  const data = await imageGetFromDB(kapottTipus);
  res.status(200).json(data);
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

router.post("/jelentkez", async (req, res) => {
  try {
    const { user_id, esemenyek_id } = req.body;
    console.log("Kapott adatok:", req.body);
    const asd = await jelentkezes(user_id, esemenyek_id);
    res.status(201).json(asd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get(`/votes/:id`, async (req, res) => {
  const id = Number(req.params.id);
  try {
    const data = await esemenyUser(id);
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post(`/already/:id`, async (req, res) => {
  const esmeny = Number(req.params.id);
  const { user } = req.body;
  try {
    const data = await already(user, esmeny);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put(`/passwordChange/:id`, async (req, res) => {
  const { password, passwordReset1, passwordReset2 } = req.body;
  const user_id = Number(req.params.id);
  try {
    const data = await passwordUpdate(
      user_id,
      password,
      passwordReset1,
      passwordReset2
    );
    res.status(201).json(data);
  } catch (error) {
    console.error(error);

    res.status(400).json({ message: error.message });
  }
});

export { router as userController };
