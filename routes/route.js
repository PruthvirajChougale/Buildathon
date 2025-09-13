import express from "express";
const router = express.Router();
import { AddUser, CalculateDashboardVals, Claim, DashboardCustomer, getCustomerDetails } from "../controllers/dashboard.js";
import SignupUser from "../controllers/signup.js";
import LoginUser from "../controllers/login.js";

router.get("/dashboard-customer",DashboardCustomer);
router.post("/add-customer",AddUser);
//router.put("/add-policy",AddPolicy);
router.put("/claim",Claim);
router.post("/signup",SignupUser);
router.post("/login",LoginUser);
router.get("/customer-details",getCustomerDetails);
router.get("/dashboard-values",CalculateDashboardVals);

export default router;