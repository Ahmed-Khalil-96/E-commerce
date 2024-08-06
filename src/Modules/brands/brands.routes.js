import { Router } from "express";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import auth from "../../Middlewares/auth.js";
import * as BC from "./brands.controller.js";

const brandRouter = Router()

brandRouter.post("/",multerHost(validFiles.image).single("image"),auth(['admin',"superAdmin"]),BC.createBrand)
brandRouter.patch("/updateBrand/:id",multerHost(validFiles.image).single("image"),auth(["admin","superAdmin"]),BC.updateBrand)
brandRouter.get("/",auth(["user","admin","superAdmin"]),BC.getBrands)
brandRouter.delete("/deleteBrand/:id",auth(["admin","superAdmin"]),BC.deleteBrand)


export default brandRouter