import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as CC from "./cart.controller.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../Middlewares/validation.js";
import* as CV from "./cart.validation.js";
const cartRouter = Router()


cartRouter.post("/addToCart",validation(CV.addToCart),auth([systemRoles.user]),CC.addToCart)
cartRouter.patch("/update/:id",validation(CV.updateQuantity),auth([systemRoles.user]),CC.updateQuantity)
cartRouter.patch("/removeProduct/:id",validation(CV.removeFromCart),auth([systemRoles.user]),CC.removeItem)
cartRouter.get("/",validation(CV.getLoggedUserCart),auth([systemRoles.user,systemRoles.admin]),CC.getUserCart)
cartRouter.delete("/",validation(CV.clearCart),auth([systemRoles.user]),CC.clearCart)
cartRouter.patch("/applyCoupon",validation(CV.applyCoupon),auth([systemRoles.user]),CC.applyCoupon)


export default cartRouter