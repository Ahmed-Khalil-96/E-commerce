import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as CC from "./coupons.controller.js";
const couponRouter = Router()


couponRouter.post("/",auth(["admin","superAdmin"]),CC.addCoupon)
couponRouter.patch("/updateCoupon/:id",auth(["admin","superAdmin"]),CC.updateCoupon)
couponRouter.delete("/deleteCoupon/:id",auth(["admin","superAdmin"]), CC.deleteCoupon)
couponRouter.get("/",auth(["admin","superAdmin"]), CC.getCoupons)
couponRouter.get("/coupon/:id",auth(["admin","superAdmin"]),CC.getACoupon)

export default couponRouter