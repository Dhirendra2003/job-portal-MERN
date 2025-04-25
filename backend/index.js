// filepath: /d:/Projects/job-portal-MERN/backend/index.js
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRoute from './routes/user.route.js'
import companyRoute from "./routes/company.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import http from 'http'; // Import http module
import { Server } from 'socket.io'; // Import Server from socket.io
import initializeSocket from "./socket/socketHandler.js"; // Import the socket handler
import chatRouter from "./routes/messages.route.js";

dotenv.config({})

const app=express()
const server=http.createServer(app) // Create an HTTP server

// Configure Socket.IO
const io = new Server(server, {
  cors: {
    // origin: 'http://localhost:5173', // Your frontend URL for development
    origin: '*', // Allow all origins for now, adjust for production
    methods: ["GET", "POST"],
    credentials: true // Be cautious with credentials and '*' origin in production
  }
});


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption={
  // origin:'https://job-portal-mern-omega.vercel.app',
  origin:'http://localhost:5173',
  credentials:true,
  methods:['GET','POST','PUT','DELETE']
}
app.use(cors(corsOption))

app.get('/home',(req,resp)=>{
  resp.status(200).json('this is updated home')
})
var port=process.env.PORT
app.use('/api/v1/user',userRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/job',jobRoute)
app.use('/api/v1/application',applicationRoute)
app.use('/api/v1/message',chatRouter)

// Initialize Socket.IO connection handling by passing the 'io' instance
initializeSocket(io);

// Use the HTTP server to listen instead of the Express app directly
server.listen(port, async ()=> {
  const connection = await connectDB()
  if (connection) {
    console.log('MongoDB connected');
  } else {
    console.error('MongoDB connection failed');
  }
  console.log('server running on',`http://localhost:${port}`)
})


// app.listen(port,()=>{
//   connectDB()
//   console.log('server running on port',port)
// })