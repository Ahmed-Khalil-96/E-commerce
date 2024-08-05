import { Router } from "express";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import auth from "../../Middlewares/auth.js";
import * as SCC from "./subCategories.controller.js";

const subCategoriesRouter = Router({mergeParams:true})

subCategoriesRouter.post("/", multerHost(validFiles.image).single("image"),auth(["admin","superAdmin"]),SCC.createSubCategory)
subCategoriesRouter.patch("/:subCategoryId",multerHost(validFiles.image).single("image"),auth(["admin","superAdmin"]),SCC.updateSubCategory)
subCategoriesRouter.get("/",auth(["user","admin","superAdmin"]),SCC.getSubCategories)

export default subCategoriesRouter