import { Router } from "express";
import auth from "../../Middlewares/auth.js";
import * as RC from "./reviews.controller.js"




const reviewRouter=Router({mergeParams:true})

reviewRouter.post("/",auth(["user","admin"]),RC.addReview)
reviewRouter.delete("/:reviewId",auth(["user","admin"]),RC.deleteReview)
reviewRouter.get("/",auth(["user","admin"]),RC.getProductReviews)


export default reviewRouter