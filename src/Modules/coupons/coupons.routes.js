import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as CC from "./coupons.controller.js";
import { systemRoles } from "../../utils/systemRoles.js";
const couponRouter = Router()


couponRouter.post("/",auth([systemRoles.admin]),CC.addCoupon)
couponRouter.patch("/updateCoupon/:id",auth([systemRoles.admin]),CC.updateCoupon)
couponRouter.delete("/deleteCoupon/:id",auth([systemRoles.admin]), CC.deleteCoupon)
couponRouter.get("/",auth([systemRoles.admin]), CC.getCoupons)
couponRouter.get("/coupon/:id",auth([systemRoles.admin]),CC.getACoupon)

export default couponRouter