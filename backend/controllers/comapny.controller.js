import { Company } from "../models/company.model.js";
import getDataURI from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, resp) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return resp.status(400).json({
        message: "company name is required",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return resp.status(400).json({
        message: "you can not add same company",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return resp.status(201).json({
      message: "company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, resp) => {
  try {
    const userId = req.id; //loged user id
    const companies = await Company.find({ userId });
    if (!companies) {
      return resp.status(404).json({
        message: "companies not found",
        success: false,
      });
    }
    return resp.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//get company by id
export const getCompanyById = async (req, resp) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return resp.status(404).json({
        message: "company not found",
        success: false,
      });
    }
    return resp.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, resp) => {
  try {
    const { name, description, website, location } = req.body;
    //cloudinary
    const file = req.file ? req.file : "";
    var fileURI;
    var cloudResponse;
    if (file) {
      fileURI = getDataURI(file);
      cloudResponse = await cloudinary.uploader.upload(fileURI.content);
    }

    const updateData = {
      name,
      description,
      website,
      location,
      logo: file ? cloudResponse.secure_url : "",
    };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return resp.status(404).json({
        message: "company not found",
        success: false,
      });
    }

    return resp.status(200).json({
      message: "company info updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
