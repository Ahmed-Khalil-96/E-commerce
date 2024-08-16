import { Router } from "express";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import auth from "../../Middlewares/auth.js";
import * as BC from "./brands.controller.js";
import { systemRoles } from "../../utils/systemRoles.js";

const brandRouter = Router()

brandRouter.post("/",multerHost(validFiles.image).single("image"),auth([systemRoles.admin,systemRoles.superAdmin]),BC.createBrand)
brandRouter.patch("/updateBrand/:id",multerHost(validFiles.image).single("image"),auth([systemRoles.admin,systemRoles.superAdmin]),BC.updateBrand)
brandRouter.get("/",auth([Object(systemRoles.values)]),BC.getBrands)
brandRouter.delete("/deleteBrand/:id",auth([systemRoles.admin,systemRoles.superAdmin]),BC.deleteBrand)
brandRouter.get("/:id",auth([systemRoles.admin,systemRoles.superAdmin]),BC.getSingleBrand)


export default brandRouter