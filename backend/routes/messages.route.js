import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createChat, fetchMessages } from "../controllers/message.controller.js";

const chatRouter = express.Router();

chatRouter.route('/fetch-chats').get(isAuthenticated,fetchMessages)
chatRouter.route('/create-chat').post(isAuthenticated,createChat)



export default chatRouter;
