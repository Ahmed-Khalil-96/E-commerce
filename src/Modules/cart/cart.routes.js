import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as CC from "./cart.controller.js";
import { systemRoles } from "../../utils/systemRoles.js";
const cartRouter = Router()

cartRouter.post("/addToCart",auth([systemRoles.user]),CC.addToCart)
cartRouter.patch("/update/:id",auth([systemRoles.user]),CC.updateQuantity)
cartRouter.patch("/removeProduct/:id",auth([systemRoles.user]),CC.removeItem)
cartRouter.get("/",auth([systemRoles.user,systemRoles.admin]),CC.getUserCart)
cartRouter.delete("/",auth([systemRoles.user]),CC.clearCart)
cartRouter.patch("/applyCoupon",auth([systemRoles.user]),CC.applyCoupon)


export default cartRouter