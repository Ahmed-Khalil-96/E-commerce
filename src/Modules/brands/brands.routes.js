import { Router } from "express";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import auth from "../../Middlewares/auth.js";
import * as BC from "./brands.controller.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../Middlewares/validation.js";
import * as BV from "./brands.validation.js";

const brandRouter = Router()

brandRouter.post("/",multerHost(validFiles.image).single("image"),validation(BV.createBrand),auth([systemRoles.admin,systemRoles.superAdmin]),BC.createBrand)
brandRouter.patch("/updateBrand/:id",multerHost(validFiles.image).single("image"),validation(BV.updateBrand),auth([systemRoles.admin,systemRoles.superAdmin]),BC.updateBrand)
brandRouter.get("/",BC.getBrands)
brandRouter.delete("/deleteBrand/:id",validation(BV.deleteBrand),auth([systemRoles.admin,systemRoles.superAdmin]),BC.deleteBrand)
brandRouter.get("/:id",validation(BV.getSingleBrand),BC.getSingleBrand)


export default brandRouter