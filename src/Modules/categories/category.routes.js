import { Router } from "express";
import auth from "../../Middlewares/auth.js";

import * as CC from "./category.controller.js";
import { multerHost, validFiles } from "../../Middlewares/multer.js";

const categoryRouter=Router()

categoryRouter.post("/", multerHost(validFiles.image).single("image"),auth(["admin"],["superAdmin"]),CC.createCategory)

export default categoryRouter