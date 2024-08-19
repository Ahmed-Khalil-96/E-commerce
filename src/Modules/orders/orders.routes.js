import express, { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as OC from "./orders.controller.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../Middlewares/validation.js";
import * as OV from "./orders.validation.js";
const orderRouter= Router({mergeParams:true})

orderRouter.post("/",validation(OV.createOrder),auth([systemRoles.user]),OC.createCashOrder)
orderRouter.get("/:userId",validation(OV.getUserOrders),auth([systemRoles.admin]),OC.getUserOrders)
orderRouter.get("/ownOrders",validation(OV.getOwnOrders),auth([systemRoles.user,systemRoles.admin]),OC.getOwnOrders)
orderRouter.get("/allOrders",validation(OV.getAllOrders),auth([systemRoles.admin]),OC.getAllOrders)
orderRouter.patch("/cancel/:id",validation(OV.cancelOrder),auth([systemRoles.user,systemRoles.admin]), OC.cancelOrder)
orderRouter.post("/create-checkout-session",validation(OV.checkOut),auth([systemRoles.user]),OC.createCheckOutSession)
orderRouter.post('/webhook',  express.raw({type:'application/json'}),OC.createWebHook)

export default orderRouter