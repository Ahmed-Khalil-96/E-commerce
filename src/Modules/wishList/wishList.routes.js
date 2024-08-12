import { Router } from "express";
import * as WLC from "./wishList.controller.js";
import auth  from "../../Middlewares/auth.js";

const wishListRouter=Router({mergeParams:true})

wishListRouter.post("/add",auth(["user","admin"]),WLC.addToWishList)
wishListRouter.patch("/remove",auth(["user","admin"]),WLC.removeFromWishList)


export default wishListRouter