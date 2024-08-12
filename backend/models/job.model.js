import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [
    {
      type: String,
    },
  ],
  salary: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  positions: {
    type: Number,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    require: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  applications:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Application',
   
  }]
},{timestamps:true});
export const Job=mongoose.model('Job',jobSchema)
