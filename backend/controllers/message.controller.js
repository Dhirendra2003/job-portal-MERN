import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

//For REST API
export const fetchMessages = async (req, res) => {
  try {
    const userId = req.id;
    // console.log(userId);
    // const user = await User.find({ _id: userId });
    // console.log(user);
    const chats = await Message.find({ applicantId: userId })
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
    const { jobId, companyId, recruiterId, applicantId, chats } = req.body;

    // Validate required fields
    if (!jobId || !companyId || !recruiterId || !applicantId || !chats) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const roomName = `${applicantId}-${jobId}-${applicantId}`;

    // Create new message document
    const newChat = await Message.create({
      roomName,
      jobId,
      companyId,
      recruiterId,
      applicantId,
      chats,
    });

    res.status(201).json(newChat);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//For Websocket
export const saveMessage = async (data) => {
  try {
    const { roomName, sender, message } = data;

    // Validate required fields
    if (!roomName || !sender || !message) {
      return {
        status: false,
        message: "Missing required fields",
      };
    }

    //update existing message document with new message
    const updatedMessage = await Message.findOneAndUpdate(
      { roomName },
      {
        $push: {
          chats: {
            sender,
            message,
          },
        },
      },
      { new: true }
    );

    if (!updatedMessage) {
      return {
        status: false,
        message: "Error saving message",
      };
    }
    
    // Return success object
    return {
      status: true,
      message: "Message saved successfully", 
      data: {
        sender, 
        message 
      }
    };

  } catch (error) {
    console.error("Error saving message:", error);
    // Return an error object
    return {
      status: false,
      message: "Internal server error "+ error.message
    };
  }
};
