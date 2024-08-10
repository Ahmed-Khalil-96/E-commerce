import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as OC from "./orders.controller.js";
const orderRouter= Router()

orderRouter.post("/",auth(["user","admin"]),OC.createCashOrder)

export default orderRouter