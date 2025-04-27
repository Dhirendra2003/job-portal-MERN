import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

//For REST API
export const fetchMessages = async (req, res) => {
  try {
    const userId = req.id;
    // console.log(userId);
    // const user = await User.find({ _id: userId });
    // console.log(user);
    const chats = await Message.find({
      $or: [{ applicantId: userId }, { recruiterId: userId }],
    })

      .populate("companyId jobId")
      .exec();

    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createChat = async (req, res) => {
  try {
    //check if job chat already exists:
    const { jobId, companyId, recruiterId, applicantId, chats } = req.body;
    const oldChat = await Message.findOne({
      jobId: jobId,
      applicantId: applicantId,
    });
    console.log(oldChat);

    // Validate required fields
    if (!jobId || !companyId || !recruiterId || !applicantId || !chats) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let newChat = {};
    // Create new message document
    if (!oldChat) {
      console.log("old chat doesnt exist");
      newChat = await Message.create({
        jobId,
        companyId,
        recruiterId,
        applicantId,
        chats,
      });
    } 
    if(oldChat){
      oldChat.chats = chats;
      const returned = await oldChat.save();
      console.log(oldChat);
      console.log(returned);
      newChat = returned;
    }

    res.status(201).json(newChat);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//For Websocket
export const saveMessage = async (data) => {
  try {
    // Basic validation (ensure required fields are present in data)
    if (
      !data ||
      !data.sender ||
      !data.receiver ||
      !data.message ||
      !data.roomName
    ) {
      console.error("Error saving message: Invalid data received", data);
      // Return an error object instead of using res
      return {
        status: false,
        message: "Invalid message data provided.",
      };
    }

    const { roomName, sender, receiver, message } = data;
    console.log("Saving message:", data);
    const newMessage = new Message({
      roomName: roomName,
      sender: sender,
      receiver: receiver,
      message: message, // Assuming 'message' field in data holds the text
    });
    await newMessage.save();
    // Return the success status and the saved message document
    return {
      status: true,
      message: "Message saved successfully",
      data: newMessage, // Send back the saved document
    };
  } catch (error) {
    console.error("Error saving message:", error);
    // Return an error object
    return {
      status: false,
      message: "Internal server error while saving message.",
    };
  }
};
