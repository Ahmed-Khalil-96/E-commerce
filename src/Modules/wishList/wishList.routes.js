import { Router } from "express";
import * as WLC from "./wishList.controller.js";
import auth  from "../../Middlewares/auth.js";
import { systemRoles } from "../../utils/systemRoles.js";

const wishListRouter=Router({mergeParams:true})

wishListRouter.post("/add",auth([systemRoles.user]),WLC.addToWishList)
wishListRouter.patch("/remove",auth([systemRoles.user]),WLC.removeFromWishList)


export default wishListRouter