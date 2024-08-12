import reviewModel from "../../../DB/Models/reviews/reviews.model.js";
import orderModel from "../../../DB/Models/orders/order.model.js";
import productModel from "../../../DB/Models/products/products.model.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";



// ==============================add review===================================
export const addReview =asyncHandler(async(req,res,next)=>{
    const{comment , rate}= req.body
    const{productId}=req.params

    const product = await productModel.findById(productId)
    if(!product) {
        return next(new AppError('Product not found', 404))
        }

    // const reviewExist = await reviewModel.findOne({user:req.user.id,product:productId})
    // if(reviewExist) {
    //     return next(new AppError('You have already reviewed this product', 400))
    //     }

     const order = await orderModel.findOne({
        user:req.user.id,
        "products.productId":productId,
        isDelivered:true
     })   
     if(!order) {
        return next(new AppError('You have not purchased this product', 400))
        }

        const review = await reviewModel.create({
            user:req.user.id,
            comment,
            rate,
            product:productId
        })

let sum = product.rateAvg*product.rateNum
    sum+=rate
    product.rateNum+=1
    product.rateAvg=sum/product.rateNum
    await product.save()
   return res.status(201).json({message:'Review added successfully',review})
})

// ==========================delete review ===========================
export const deleteReview =asyncHandler(async(req,res,next)=>{
    const{productId,reviewId}=req.params

    const product = await productModel.findById(productId)
    if(!product) {
        return next(new AppError('Product not found', 404))
        }
    const review = await reviewModel.findOneAndDelete({_id:reviewId,user:req.user.id,product:productId})
    if(!review) {
        return next(new AppError('Review not found', 404))
    }
  let sum = product.rateAvg*product.rateNum
  sum-=review.rate
  product.rateNum-=1
  product.rateAvg=sum/product.rateNum
  await product.save()
  return res.status(200).json({message:'Review deleted successfully'})
})
// ================================get product reviews==========================

export const getProductReviews = asyncHandler(async(req,res,next)=>{
    const productId = req.params.productId
    const product = await productModel.findById(productId)
    if(!product) {
        return next(new AppError('Product not found', 404))
        }
    const reviews = await reviewModel.find({product:productId})
    return res.status(200).json({reviews})
})