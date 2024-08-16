import { Router } from "express";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import auth from "../../Middlewares/auth.js";
import * as SCC from "./subCategories.controller.js";
import { systemRoles } from "../../utils/systemRoles.js";

const subCategoriesRouter = Router({mergeParams:true})

subCategoriesRouter.post("/", multerHost(validFiles.image).single("image"),auth([systemRoles.admin]),SCC.createSubCategory)
subCategoriesRouter.patch("/:subCategoryId",multerHost(validFiles.image).single("image"),auth([systemRoles.admin]),SCC.updateSubCategory)
subCategoriesRouter.get("/",auth([Object(systemRoles.values)]),SCC.getSubCategories)
subCategoriesRouter.delete("/deleteSubcategory/:subCategoryId",auth([systemRoles.admin]),SCC.deleteSubcategories)
subCategoriesRouter.get("/:id",auth([Object(systemRoles.values)]),SCC.getSubCategory)

export default subCategoriesRouter