import { Router } from "express";
import auth from "../../Middlewares/auth.js";

import * as CC from "./category.controller.js";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import subCategoriesRouter from "../subCategories/subCategories.routes.js";

const categoryRouter=Router()


categoryRouter.use("/:categoryId/subCategories",subCategoriesRouter)
categoryRouter.post("/", multerHost(validFiles.image).single("image"),auth(["admin"],["superAdmin"]),CC.createCategory)
categoryRouter.patch("/updateCategory/:id",multerHost(validFiles.image).single("image"),auth(["admin","superAdmin"]),CC.updateCategory)
categoryRouter.get("/",auth(["user","admin","superAdmin"]),CC.getCategories)
categoryRouter.delete("/deleteCategory/:id",auth(["admin","superAdmin"]),CC.deleteCategory)
categoryRouter.get("/:id",auth(["user","admin","superAdmin"]),CC.getCategory)

export default categoryRouter