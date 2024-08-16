import { Router } from "express";
import * as UC from "./user.controller.js";
import auth  from "../../Middlewares/auth.js";
import orderRouter from "../orders/orders.routes.js";
import { systemRoles } from "../../utils/systemRoles.js";

const router = Router()

router.use("/:userId/orders",orderRouter)

router.post("/createUser",auth([systemRoles.admin,systemRoles.superAdmin]),UC.createUser)
router.patch("/updateUser/:id",auth([Object.values(systemRoles)]),UC.updateUser)
router.delete("/deleteUser/:id",auth([Object.values(systemRoles)]),UC.deleteUser)
router.get("/profile/:id",auth([Object.values(systemRoles)]),UC.getProfile)
router.put("/updateUserPassByAdmin/:id",auth([systemRoles.admin,systemRoles.superAdmin]),UC.updateUserPassByAdmin)
router.post("/adminApp",auth([systemRoles.user]),UC.adminApplication)
router.get("/",auth([systemRoles.admin,systemRoles.superAdmin]),UC.getAllUsers)
export default router