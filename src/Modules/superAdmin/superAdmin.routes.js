import { Router } from "express";
import * as SAC from "../superAdmin/superAdmin.controller.js";
import auth from "../../Middlewares/auth.js";


const superAdminRouter= Router()

superAdminRouter.patch("/admin-approval/:id",auth(["superAdmin"]),SAC.adminApproval)

export default superAdminRouter
