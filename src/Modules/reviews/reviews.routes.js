import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as RC from "./reviews.controller.js"
import { systemRoles } from "../../utils/systemRoles.js";
import { validation } from "../../Middlewares/validation.js";
import * as RV from "./reviews.validation.js";




const reviewRouter=Router({mergeParams:true})

reviewRouter.post("/",validation(RV.addReview),auth([systemRoles.user,systemRoles.admin]),RC.addReview)
reviewRouter.delete("/:reviewId",validation(RV.deleteReview),auth([systemRoles.user,systemRoles.admin]),RC.deleteReview)
reviewRouter.get("/",validation(RV.getProductReviews),RC.getProductReviews)


export default reviewRouter