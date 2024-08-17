import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} from "../controllers/comapny.controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").post(isAuthenticated, getCompany);
router.route("/get/:id").post(isAuthenticated, getCompanyById);
router.route("/update/:id").get(isAuthenticated, updateCompany);

export default router;
