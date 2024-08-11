import { Router } from "express";
import * as UC from "./user.controller.js";
import auth  from "../../Middlewares/auth.js";
import orderRouter from "../orders/orders.routes.js";

const router = Router()

router.use("/:userId/orders",orderRouter)

router.post("/createUser",auth(["admin","superAdmin"]),UC.createUser)
router.patch("/updateUser/:id",auth(["user","admin","superAdmin"]),UC.updateUser)
router.delete("/deleteUser/:id",auth(["user","admin","superAdmin"]),UC.deleteUser)
router.get("/profile/:id",auth(["user","admin","superAdmin"]),UC.getProfile)
router.put("/updateUserPassByAdmin/:id",auth(["admin","superAdmin"]),UC.updateUserPassByAdmin)
router.post("/adminApp",auth(["user"]),UC.adminApplication)
router.get("/",auth(["admin","superAdmin"]),UC.getAllUsers)
export default router