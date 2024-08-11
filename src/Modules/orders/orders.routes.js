import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as OC from "./orders.controller.js";
const orderRouter= Router({mergeParams:true})

orderRouter.post("/",auth(["user","admin"]),OC.createCashOrder)
orderRouter.get("/",auth(["admin"]),OC.getUserOrders)
orderRouter.get("/ownOrders",auth(["user"]),OC.getOwnOrders)
orderRouter.get("/allOrders",auth(["admin"]),OC.getAllOrders)
orderRouter.patch("/cancel/:id",auth(["user","admin"]), OC.cancelOrder)

export default orderRouter