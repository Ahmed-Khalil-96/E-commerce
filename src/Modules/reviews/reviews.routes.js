import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as RC from "./reviews.controller.js"
import { systemRoles } from "../../utils/systemRoles.js";




const reviewRouter=Router({mergeParams:true})

reviewRouter.post("/",auth([systemRoles.user,systemRoles.admin]),RC.addReview)
reviewRouter.delete("/:reviewId",auth([systemRoles.user,systemRoles.admin]),RC.deleteReview)
reviewRouter.get("/",auth([systemRoles.user,systemRoles.admin]),RC.getProductReviews)


export default reviewRouter