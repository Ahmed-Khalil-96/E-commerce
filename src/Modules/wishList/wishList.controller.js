import wishListModel from "../../../DB/Models/wishList/wishList.model.js";
import productModel from "../../../DB/Models/products/products.model.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";

// ===========================addToWishList=================================================
export const addToWishList = asyncHandler(async(req,res,next)=>{

    const {productId}=req.params
    const product = await productModel.findById(productId)
    if(!product){
        return next(new AppError('Product not found',404))
        }

    const wishList = await wishListModel.findOne({user:req.user.id})
    if(!wishList){
        const newWishList = await wishListModel.create({user:req.user.id,products:[productId]})
        return res.status(201).json({message:'Product added to wish list',wishList:newWishList})}

    const newWishList = await wishListModel.findOneAndUpdate({user:req.user.id},{$addToSet:{products:productId}},{new:true}).populate({
        path:'products',
        select:'name price image'
    })
    return res.status(200).json({message:'Product added to wish list',wishList:newWishList})

})

// ==============================remove from wishlist======================================
export const removeFromWishList = asyncHandler(async(req,res,next)=>{

    const {productId}=req.params
    const product = await productModel.findById(productId)
    if(!product){
        return next(new AppError('Product not found',404))
        }

    const wishList = await wishListModel.findOne({user:req.user.id,"products":productId})
    if(!wishList){
        return next(new AppError('Product not found in wish list',404))
        }
    const newWishList = await wishListModel.findOneAndUpdate({user:req.user.id},{$pull:{products:productId}},{new:true}).populate({
        path:'products',
        select:'name price'
    })
    return res.status(200).json({message:'Product deleted from wish list',wishList:newWishList})

})