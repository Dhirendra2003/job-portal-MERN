import { Job } from "../models/job.model.js";

export const postJob = async (req, resp) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      jobType,
      experience,
      position,
      companyId,
      location,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !jobType ||
      !experience ||
      !position ||
      !companyId ||
      !location
    ) {
      console.log({
        title,
        description,
        requirements,
        salary,
        jobType,
        experience,
        position,
        companyId,
        location,
      });
      return resp.status(400).json({
        message: "something is missing ",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      jobType,
      experienceLevel: experience,
      positions:position,
      location:location,
      company: companyId,
      created_by: userId,
    });
    return resp.status(201).json({
      message: "new job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllJobs = async (req, resp) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex:keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
      path:'company'
    }).sort({createdAt :-1})
    if (!jobs) {
      return resp.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return resp.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, resp) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path:'company'
    }).sort({createdAt :-1});
    if (!job) {
      return resp.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return resp.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, resp) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({
      created_by: adminId,
    }).populate({
      path:'company'
    }).sort({createdAt :-1});
    if (!jobs) {
      return resp.status(404).json({
        message: "jobs not found",
        success: false,
      });
    }
    return resp.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
