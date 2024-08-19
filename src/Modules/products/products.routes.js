import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import * as PC from "./products.controller.js";
import reviewRouter from "../reviews/reviews.routes.js";
import wishListRouter from "../wishList/wishList.routes.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../Middlewares/validation.js";
import * as PV from "./products.validation.js";

const productRouter = Router()

productRouter.use("/:productId/wishList",wishListRouter)
productRouter.use("/:productId/reviews",reviewRouter)
productRouter.post("/",multerHost(validFiles.image).fields([{name:"image",maxCount:1},{name:"coverImages", maxCount:3}]),validation(PV.addProduct),auth([systemRoles.admin]),PC.addProduct)
productRouter.get("/", PC.getProducts)
productRouter.get("/product/:id",validation(PV.getSingleProduct),PC.getSingleProduct)
productRouter.put("/:id",multerHost(validFiles.image).fields([{name:"image",maxCount:1},{name:"coverImages",maxCount:3}]),validation(PV.updateProduct),auth([systemRoles.admin]),PC.updateProduct)
productRouter.delete("/:id",validation(PV.deleteProduct),auth([systemRoles.admin]),PC.deleteProduct)

export default productRouter