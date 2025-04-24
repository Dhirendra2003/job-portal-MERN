import mongoose from "mongoose";

const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_LOCAL)
    return mongoose.connection
  }
  catch(err){
    console.log(err)
  }
}
export default connectDB