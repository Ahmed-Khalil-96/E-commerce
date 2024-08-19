import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as CC from "./coupons.controller.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../Middlewares/validation.js";
import* as CV from "./coupons.validation.js";
const couponRouter = Router()


couponRouter.post("/",validation(CV.addCoupon),auth([systemRoles.admin]),CC.addCoupon)
couponRouter.patch("/updateCoupon/:id",validation(CV.updateCoupon),auth([systemRoles.admin]),CC.updateCoupon)
couponRouter.delete("/deleteCoupon/:id",validation(CV.deleteCoupon),auth([systemRoles.admin]), CC.deleteCoupon)
couponRouter.get("/",validation(CV.getAllCoupons),auth([systemRoles.admin]), CC.getCoupons)
couponRouter.get("/coupon/:id",validation(CV.getSingleCoupon),auth([systemRoles.admin]),CC.getACoupon)

export default couponRouter