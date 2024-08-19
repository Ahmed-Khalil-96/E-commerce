import { Router } from "express";
import * as UC from "./user.controller.js";
import auth  from "../../Middlewares/auth.js";
import orderRouter from "../orders/orders.routes.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../Middlewares/validation.js";
import * as UV from "./user.validation.js";


const router = Router()

router.use("/:userId/orders",orderRouter)

router.post("/createUser",validation(UV.addUser),auth([systemRoles.admin,systemRoles.superAdmin]),UC.createUser)
router.patch("/updateUser/:id",validation(UV.updateUser),auth([Object.values(systemRoles)]),UC.updateUser)
router.delete("/deleteUser/:id",validation(UV.deleteUser),auth([Object.values(systemRoles)]),UC.deleteUser)
router.get("/profile/:id",validation(UV.getProfile),UC.getProfile)
router.put("/updateUserPassByAdmin/:id",validation(UV.updateUserPassByAdmin),auth([systemRoles.admin,systemRoles.superAdmin]),UC.updateUserPassByAdmin)
router.post("/adminApp",validation(UV.adminApplication),auth([systemRoles.user]),UC.adminApplication)
router.get("/",validation(UV.getAllUsers),auth([systemRoles.admin,systemRoles.superAdmin]),UC.getAllUsers)
export default router