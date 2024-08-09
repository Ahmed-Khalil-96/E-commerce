import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as CC from "./cart.controller.js";
const cartRouter = Router()

cartRouter.post("/addToCart",auth(["user","superAdmin","admin"]),CC.addToCart)
cartRouter.patch("/update/:id",auth(["admin","user"]),CC.updateQuantity)
cartRouter.patch("/removeProduct/:id",auth(["user","admin"]),CC.removeItem)
cartRouter.get("/",auth(["user","admin"]),CC.getUserCart)
cartRouter.delete("/",auth(["user","admin"]),CC.clearCart)
cartRouter.patch("/applyCoupon",auth(["user","admin"]),CC.applyCoupon)


export default cartRouter