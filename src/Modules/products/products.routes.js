import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import { multerHost, validFiles } from "../../Middlewares/multer.js";
import * as PC from "./products.controller.js";
import reviewRouter from "../reviews/reviews.routes.js";
import wishListRouter from "../wishList/wishList.routes.js";

const productRouter = Router()

productRouter.use("/:productId/wishList",wishListRouter)
productRouter.use("/:productId/reviews",reviewRouter)
productRouter.post("/",multerHost(validFiles.image).fields([{name:"image",maxCount:1},{name:"coverImages", maxCount:3}]),auth(["admin","superAdmin"]),PC.addProduct)
productRouter.get("/",auth(["user","admin","superAdmin"]), PC.getProducts)
productRouter.get("/product/:id",auth(["user","admin","superAdmin"]),PC.getSingleProduct)


export default productRouter