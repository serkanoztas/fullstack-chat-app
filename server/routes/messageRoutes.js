import express from "express";
import { getMessages, getUserForSidebar, markMessageAsSeen, sendMessage } from "../controllers/messageController.js";
import { protectRoute } from "../middleware/auth.js";


const messageRouter = express.Router();

messageRouter.post("/users", protectRoute, getUserForSidebar);
messageRouter.post("/:id", protectRoute, getMessages);
messageRouter.post("/mark/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);

export default messageRouter;