// Create a new file: src/utils/socketHandler.js

import { useEffect, useState } from 'react';

export function useMultiRoomSocket(socket, user) {
  const [roomMessages, setRoomMessages] = useState({});
  const [activeRooms, setActiveRooms] = useState([]);
  const [connected, setConnected] = useState(false);

  // Initialize socket connection and event handlers
  useEffect(() => {
    if (!socket) return;

    // Handle connection
    const onConnect = () => {
      console.log('Socket connected');
      setConnected(true);
      
      // Rejoin all active rooms after reconnection
      activeRooms.forEach(room => {
        socket.emit('joinRoom', room);
      });
    };

    // Handle disconnection
    const onDisconnect = () => {
      console.log('Socket disconnected');
      setConnected(false);
    };

    // Handle room messages
    const handleRoomMessage = (data) => {
      const { roomName, chats } = data;
      console.log(`Message received in room ${roomName}`, chats);
      
      setRoomMessages(prev => ({
        ...prev,
        [roomName]: chats
      }));
    };

    // Handle errors
    const handleError = (errorMessage) => {
      console.error("Error from socket:", errorMessage);
    };

    // Set up event listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('roomMessage', handleRoomMessage);
    socket.on('error', handleError);

    // Debug all events
    socket.onAny((event, ...args) => {
      console.log(`Socket Event: ${event}`, args);
    });

    // Clean up event listeners
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('roomMessage', handleRoomMessage);
      socket.off('error', handleError);
      socket.offAny();
    };
  }, [socket, activeRooms]);

  // Join a room
  const joinRoom = (roomName) => {
    if (!socket || !roomName) return;
    
    socket.emit('joinRoom', roomName);
    
    if (!activeRooms.includes(roomName)) {
      setActiveRooms(prev => [...prev, roomName]);
    }
  };

  // Leave a room
  const leaveRoom = (roomName) => {
    if (!socket || !roomName) return;
    
    socket.emit('leaveRoom', roomName);
    
    setActiveRooms(prev => prev.filter(room => room !== roomName));
    setRoomMessages(prev => {
      const newMessages = {...prev};
      delete newMessages[roomName];
      return newMessages;
    });
  };

  // Send message to a room
  const sendMessageToRoom = (roomName, message) => {
    if (!socket || !roomName || !message) return;
    
    socket.emit('messageToRoom', {
      roomName,
      sender: user?.role === "recruiter" ? "recruiter" : "applicant",
      message
    });
  };

  return {
    roomMessages,
    activeRooms,
    connected,
    joinRoom,
    leaveRoom,
    sendMessageToRoom
  };
}