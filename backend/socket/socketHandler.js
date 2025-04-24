import jwt from 'jsonwebtoken';
import { saveMessage } from '../controllers/message.controller.js'

const initializeSocket = (io) => {

  // io.use((socket, next) => {
  //   const token = socket.handshake.query.token;
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

    // Example: Listen for chat messages
    socket.on('sendMessage', async (messageData) => {
      console.log('Message received:', messageData);
      io.emit('receiveMessage', messageData); // Emit the saved message object
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });

    // ... other event listeners (joinRoom, leaveRoom, etc.) ...
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

    socket.on('messageToRoom', async ({ roomName, message }) => { // Make async if saving
      console.log(`Message to room ${roomName} from ${socket.id}:`, message);
      // TODO: Potentially save the room message here as well using saveMessage
      // const result = await saveMessage({ sender: socket.id, receiver: roomName, message: message.text }); // Adjust receiver/room logic
      // if (result.status) {
      // Send message to everyone in the room including the sender
      io.to(roomName).emit('roomMessage', { sender: socket.id, message: message.text });
      // } else {
      //    socket.emit('error', `Failed to send message to room: ${result.message}`);
      // }
    });

  });
};

export default initializeSocket;