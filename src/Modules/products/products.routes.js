import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import * as PC from "./products.controller.js";
import reviewRouter from "../reviews/reviews.routes.js";
import wishListRouter from "../wishList/wishList.routes.js";
import { systemRoles } from "../../utils/systemRoles.js";

const productRouter = Router()

productRouter.use("/:productId/wishList",wishListRouter)
productRouter.use("/:productId/reviews",reviewRouter)
productRouter.post("/",multerHost(validFiles.image).fields([{name:"image",maxCount:1},{name:"coverImages", maxCount:3}]),auth([systemRoles.admin]),PC.addProduct)
productRouter.get("/",auth([Object(systemRoles.values)]), PC.getProducts)
productRouter.get("/product/:id",auth([Object(systemRoles.values)]),PC.getSingleProduct)
productRouter.put("/:id",multerHost(validFiles.image).fields([{name:"image",maxCount:1},{name:"coverImages",maxCount:3}]),auth([systemRoles.admin]),PC.updateProduct)
productRouter.delete("/:id",auth([systemRoles.admin]),PC.deleteProduct)

export default productRouter