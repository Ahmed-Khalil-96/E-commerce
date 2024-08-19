import { Router } from "express";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import auth from "../../Middlewares/auth.js";
import * as SCC from "./subCategories.controller.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../Middlewares/validation.js";
import * as SCV from "./subCategories.validation.js";

const subCategoriesRouter = Router({mergeParams:true})

subCategoriesRouter.post("/", multerHost(validFiles.image).single("image"),validation(SCV.createSubCategory),auth([systemRoles.admin]),SCC.createSubCategory)
subCategoriesRouter.patch("/:subCategoryId",multerHost(validFiles.image).single("image"),validation(SCV.updateSubCategory),auth([systemRoles.admin]),SCC.updateSubCategory)
subCategoriesRouter.get("/",SCC.getSubCategories)
subCategoriesRouter.delete("/deleteSubcategory/:subCategoryId",validation(SCV.deleteSubCategory),auth([systemRoles.admin]),SCC.deleteSubcategories)
subCategoriesRouter.get("/:id",validation(SCV.getSingleSubCategory),SCC.getSubCategory)

export default subCategoriesRouter