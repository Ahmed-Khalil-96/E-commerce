import express, { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as OC from "./orders.controller.js";
import { systemRoles } from "../../utils/systemRoles.js";
const orderRouter= Router({mergeParams:true})

orderRouter.post("/",auth([systemRoles.user]),OC.createCashOrder)
orderRouter.get("/:userId",auth([systemRoles.admin]),OC.getUserOrders)
orderRouter.get("/ownOrders",auth([systemRoles.user]),OC.getOwnOrders)
orderRouter.get("/allOrders",auth([systemRoles.admin]),OC.getAllOrders)
orderRouter.patch("/cancel/:id",auth([systemRoles.user,systemRoles.admin]), OC.cancelOrder)
orderRouter.post("/create-checkout-session",auth([systemRoles.user]),OC.createCheckOutSession)
orderRouter.post('/webhook',  express.raw({type:'application/json'}),OC.createWebHook)

export default orderRouter