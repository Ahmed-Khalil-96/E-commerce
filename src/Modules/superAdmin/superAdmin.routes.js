import { Router } from "express";
import * as SAC from "../superAdmin/superAdmin.controller.js";
import auth from "../../Middlewares/auth.js";
import { systemRoles } from "../../utils/systemRoles.js";


const superAdminRouter= Router()

superAdminRouter.patch("/admin-approval/:id",auth([systemRoles.superAdmin]),SAC.adminApproval)

export default superAdminRouter
