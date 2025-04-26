import express, { response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import { PrismaClient } from "@prisma/client";
import { userController } from "./controller/user.controller.js";
import { authController } from "./controller/auth.controller.js";
import { GetAllUsers, Groups } from "./services/user.service.js";
import { groupController } from "./controller/group.controller.js";
import { listAllGroup } from "./services/group.service.js";
import { listAllTokens, register } from "./services/auth.service.js";
import { verifyUserGroups } from "./middleware/auth.middleware.js";
import { registration } from "./services/emailsender.service.js";
import { passwordReset } from "./services/emailsender.service.js";
import { esemenyekController } from "./controller/esemenyek.controller.js";
import { ertekelesController } from "./controller/ertekeles.controller.js";
import { ertesitesController } from "./controller/ertesites.controller.js";
import { contactController } from "./controller/contact.controller.js";
import { chatMessageController } from "./controller/chatmessages.controller.js";
import { createMessage } from "./services/chatmessages.service.js";
import http from "http"; 
import { Server } from "socket.io";

const app = express();
const prisma = new PrismaClient();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});


app.options("*", cors(corsOptions));



app.use(express.json({limit: "50mb"}));
app.use(cookieParser());
app.use("/user", userController);

app.use("/auth", authController);
app.use("/event", esemenyekController)
app.use("/ertekeles", ertekelesController)
app.use("/ertesites", ertesitesController)
app.use("/contact", contactController)
app.use("/chatmessages", chatMessageController)


app.use(
  session({
    name: "sid",
    secret: "test",
    resave: false,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
  })
);

app.set("view engine", "ejs");

app.use("/user", /*verifyUserGroups(["ADMIN", "USER"]),*/ userController);
app.use("/auth", authController);
app.use("/group", /*verifyUserGroups(["ADMIN"]),*/ groupController);
app.use("/static", express.static("public"));


app.get("/", async (req, res) => {
  res.render("admin", {});
});

app.post("/test/registration", async(req, res)=> {
  await registration("zstamas2006@gmail.com");
  res.send("Ok")
})

app.post("/test/password-reset", async (req, res) => {
  await passwordReset("zstamas2006@gmail.com");
  res.send("Ok");
});

if (process.env.NODE_ENV !== "test")
  server.listen(3300, () => {
    console.log("Started at http://localhost:3300");
  });
  
  io.on("connection", (socket) => {
    
  
    socket.on("sendMessage", async (data) => {
      try {
        const user = await prisma.users.findUnique({
        where: {
          id: data.userId,
        },
      });
        const newMessage = {
          message: data.message,
          userName: user.username,
          userImage: user.profilkep,
        };
        await createMessage(data.userId, data.message); 
        io.emit("newMessage", newMessage); 
      } catch (err) {
        console.error("Hiba az üzenet mentése közben:", err);
      }
    }); 
  });
  export { io };
  

export default app;
