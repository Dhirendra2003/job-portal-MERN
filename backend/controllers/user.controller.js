import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataURI from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, resp) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      resp.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return resp.status(400).json({
        message: "this email already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    return resp.status(201).json({
      message: "account created successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//login
export const login = async (req, resp) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      resp.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    var user = await User.findOne({ email });
    console.log(JSON.stringify(user));
    if (!user) {
      return resp.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return resp.status(400).json({
        message: "incorrect email or password",
        success: false,
      });
    }
    //check role is same as registered
    if (role != user.role) {
      return resp.status(400).json({
        message: "Account doesnt exist with this role",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return resp
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "welcome back " + user.fullName,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, resp) => {
  try {
    return resp.status(200).cookie("token","",{ maxAge:0 }).json({
        message: "logout success",
        success: true,
      })
    ;
  } catch (error) {
    console.log(error)
  }
};

export const updateProfile = async (req, resp) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    console.log( fullName, email, phoneNumber, bio, skills)

    //cloudinary.....
    const file = req.file;
    const fileURI=getDataURI(file);
    const cloudResponse=await cloudinary.uploader.upload(fileURI.content);

    let skillsArray
    if (skills) {
       skillsArray= skills.split(",");
    }
    const userId = req.id; //middleware auth
    let user = await User.findById(userId);
    if (!user) {
      return resp.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    if (fullName) {
      user.fullName = fullName;
    }
    if (email) {
      user.email = email;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skills) {
      user.profile.skills = skillsArray;
    }

    //resume part later...
    if(cloudResponse){
      user.profile.resume=cloudResponse.secure_url; //link from cloud storage for same file
      user.profile.resumeOriginalName=file.originalname

    }

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return resp.status(200).json({
      message: "profile updated",
      user,
      success: true,
    });
  } catch (error) {}
};
