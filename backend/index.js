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
dotenv.config({})

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption={
  origin:'https://job-portal-mern-omega.vercel.app',
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


app.listen(port,()=>{
  connectDB()
  console.log('server running on port',port)
})