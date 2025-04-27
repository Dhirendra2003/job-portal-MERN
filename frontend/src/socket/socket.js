// src/socket.js
import { io } from 'socket.io-client';

let socket;

export const connectSocket = (token) => {
  socket = io("http://localhost:3000", {
    query: { token },
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Connected to socket server:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });

  return socket;
};