import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    return mongoose.connection; //no need of this return
  } catch (err) {
    console.log(err);
  }
};
export default connectDB;
