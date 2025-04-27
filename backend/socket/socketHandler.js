import jwt from 'jsonwebtoken';
import { saveMessage, getChatsByRoomName } from '../controllers/message.controller.js'

const initializeSocket = (io) => {

  // Middleware for authentication 
  // io.use((socket, next) => {
  //   const token = socket.handshake.query.token;
  //   console.log("token", token)
  //   if (!token) return next(new Error('Authentication error'));

  //   try {
  //     const user = jwt.verify(token, process.env.SECRET_KEY);
  //     socket.user = user; // Attach user data to socket
  //     next();
  //   } catch (err) {
  //     next(new Error('Authentication error'));
  //   }

  // });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
    
    // Example: Listen for chat messages 
    // global chat
    socket.on('sendMessage', async (messageData) => {
      console.log('Message received:', messageData);
      io.emit('receiveMessage', messageData); // Emit the saved message object
    });


    //Join room 
    socket.on('joinRoom', (roomName) => {
      socket.join(roomName);
      console.log(`${socket.id} joined room: ${roomName}`);
      // Optionally notify others in the room
      socket.to(roomName).emit('userJoined', `${socket.id} has joined the room`);
    });

    socket.on('leaveRoom', (roomName) => {
      socket.leave(roomName);
      console.log(`${socket.id} left room: ${roomName}`);
      // Optionally notify others in the room
      socket.to(roomName).emit('userLeft', `${socket.id} has left the room`);
    });

    socket.on('messageToRoom', async ({ roomName, sender, message }) => { // Make async if saving
      if (!roomName || !message) {
        socket.emit('error', 'Room name and message are required');
        return;
      }
      console.log(`Message to room ${roomName} from ${socket.id}:`, message);
      const result = await saveMessage({ roomName, sender, message });

      if (result.status) {
        const chats = await getChatsByRoomName(roomName);
        io.to(roomName).emit('roomMessage', { chats: chats.data }); // Emit the saved message object to the room
      } else {
        socket.emit('error', `Failed to send message to room: ${result.message}`);
      }
    });

  });
};

export default initializeSocket;