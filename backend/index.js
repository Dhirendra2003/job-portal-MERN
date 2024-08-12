import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
dotenv.config({})

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption={
  origin:'http://localhost:5173',
  credentials:true
}
app.use(cors(corsOption))

app.get('/home',(req,resp)=>{
  resp.status(200).json('this is home')
})

 var port=process.env.PORT || 8000
app.listen(port,()=>{
  connectDB()
  console.log('server running on port',port)
})