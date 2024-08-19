import { Router } from "express";
import auth from "../../Middlewares/auth.js";

import * as CC from "./category.controller.js";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import subCategoriesRouter from "../subCategories/subCategories.routes.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../Middlewares/validation.js";
import* as CV from "./category.validation.js";

const categoryRouter=Router()

categoryRouter.use("/:categoryId/subCategories",subCategoriesRouter)
categoryRouter.post("/", multerHost(validFiles.image).single("image"),validation(CV.createCategory),auth([systemRoles.admin]),CC.createCategory)
categoryRouter.patch("/updateCategory/:id",multerHost(validFiles.image).single("image"),validation(CV.updateCategory),auth([systemRoles.admin]),CC.updateCategory)
categoryRouter.get("/",CC.getCategories)
categoryRouter.delete("/deleteCategory/:id",validation(CV.deleteCategory),auth([systemRoles.admin]),CC.deleteCategory)
categoryRouter.get("/:id",validation(CV.getSingleCategory),CC.getCategory)

export default categoryRouter