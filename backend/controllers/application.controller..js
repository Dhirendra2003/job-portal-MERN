import Application from "../models/application.model.js";
import Job from "../models/job.model.js";


export const applyJob = async (req, resp) => {
  try {
    const userId = req.id;
    const { id: jobId } = req.params;

    if (!jobId) {
      return resp.status(400).json({
        message: "job id is required",
        success: false,
      });
    }
    // check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return resp.status(400).json({
        message: "already applied",
        success: false,
      });
    }
    //check job existance
    const job = await Job.findById(jobId);
    if (!job) {
      return resp.status(400).json({
        message: "job not found",
        success: false,
      });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();
    const newJob=await Job.findById(jobId).populate([
      { path: 'company' }, // Populate the 'company' field
      { path: 'applications' } // Populate the 'applications' array
    ])
    return resp.status(201).json({
      message: "job applied successfully",
      success: true,
      newJob
    });
  } catch (error) {991
    console.log(error);
  }
};

export const getAppliedJobs = async (req, resp) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
      if (!application) {
        return resp.status(404).json({
          message: "no applications",
          success: false,
        });
      }
      return resp.status(200).json({
        application,
        success:true
      })
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants =async(req, resp)=>{
  try {
    const jobId=req.params.id;
    const job=await Job.findById(jobId).populate({
      path:'applications',
      options:{sort:{createdAt:-1}},
      populate:{
        path:'applicant'
      }
    })
    if(!job){
      return resp.status(404).json({
        message: "no job found",
        success: false,
      });
    }
    return resp.status(200).json({
      job,
      success:true
    })

  } catch (error) {
    console.log(error);
  }
}

export const updateStatus=async(req,resp)=>{
  try {
    const {status}=req.body
    const applicationId=req.params.id;
    if(!applicationId){
      return resp.status(400).json({
        message:'status is required',
        success:false
      })
    }
    //find appln by applicant id
    const application =await Application.findOne({
      _id:applicationId
    })
    if(!application){
      return resp.status(404).json({
        message:'application not found',
        success:false
      })
    }
    // update the status
    application.status=status.toLowerCase()
    await application.save()

    return resp.status(200).json({
      message:'status updated successfully',
      success:true
    })
  } catch (error) {
    console.log(error);
  }
}