import { Router } from "express";
import auth from "../../Middlewares/auth.js";

import * as CC from "./category.controller.js";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import subCategoriesRouter from "../subCategories/subCategories.routes.js";
import { systemRoles } from "../../utils/systemRoles.js";

const categoryRouter=Router()


categoryRouter.use("/:categoryId/subCategories",subCategoriesRouter)
categoryRouter.post("/", multerHost(validFiles.image).single("image"),auth([systemRoles.admin]),CC.createCategory)
categoryRouter.patch("/updateCategory/:id",multerHost(validFiles.image).single("image"),auth([systemRoles.admin]),CC.updateCategory)
categoryRouter.get("/",auth([Object(systemRoles.values)]),CC.getCategories)
categoryRouter.delete("/deleteCategory/:id",auth([systemRoles.admin]),CC.deleteCategory)
categoryRouter.get("/:id",auth([Object(systemRoles.values)]),CC.getCategory)

export default categoryRouter