import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { editJob, getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";


const router = express.Router();
router.route('/post').post(isAuthenticated, postJob)
router.route('/get').get(isAuthenticated,getAllJobs)
router.route('/getadminjobs').get(isAuthenticated, getAdminJobs)
router.route('/get/:id').get(isAuthenticated, getJobById)
router.route('/edit/:id').post(isAuthenticated, editJob)

export default router;
