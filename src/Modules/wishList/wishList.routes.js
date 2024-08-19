import { Router } from "express";
import * as WLC from "./wishList.controller.js";
import auth  from "../../Middlewares/auth.js";
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../Middlewares/validation.js";
import * as WLV from "./wishList.validation.js";

const wishListRouter=Router({mergeParams:true})

wishListRouter.post("/add",validation(WLV.addToWishList),auth([systemRoles.user]),WLC.addToWishList)
wishListRouter.patch("/remove",validation(WLV.removeFromWishList),auth([systemRoles.user]),WLC.removeFromWishList)
wishListRouter.get("/",validation(WLV.getWishList),auth([systemRoles.user]),WLC.getUserWishList)


export default wishListRouter