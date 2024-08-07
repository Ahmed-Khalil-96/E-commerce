import couponModel from "../../../DB/Models/coupon/coupon.model.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";


// =============================addCoupon==================================
export const addCoupon = asyncHandler(async(req,res,next)=>{

    const{code, amount, startDate,endDate}=req.body

    const couponExist = await couponModel.findOne({code:code.toLowerCase()})
    if(couponExist){
        return next(new AppError('Coupon already exist',400))
    }
    const coupon = await couponModel.create({code,amount,startDate,endDate,addedBy:req.user.id})
    res.status(201).json({message:'Coupon created successfully',coupon})
})



// ==========================update coupon================================
export const updateCoupon = asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const{code, amount,startDate,endDate}=req.body
    const couponExist = await couponModel.findById(id)
    if(!couponExist){
        return next(new AppError('Coupon not found',404))
    }
    if(couponExist.code ===code.toLowerCase()){
        return next(new AppError('The coupon is the same',400))
    }
    if(await couponModel.findOne({code:code.toLowerCase()})){
        return next(new AppError('Coupon already exist',400))
    }
    if(req.user.id!==couponExist.addedBy.toString()){
        return next(new AppError('You are not the owner of this coupon',403))
    }
    const newCoupon = await couponModel.updateOne({code,amount,startDate,endDate})
    res.status(200).json({message:'Coupon updated successfully',newCoupon})
})



// ==================================deleteCoupon=================================
export const deleteCoupon = asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    const couponExist = await couponModel.findById(id)
    if(!couponExist){
        return next(new AppError('Coupon not found',404))
        }
    if(req.user.id!==couponExist.addedBy.toString()){
        return next(new AppError('You are not the owner of this coupon',403))
         }
         await couponExist.deleteOne(couponExist._id)
         res.status(200).json({message:'Coupon deleted successfully'})
})



// ==================================get all coupons==============================

export const getCoupons = asyncHandler(async(req,res,next)=>{
    const coupons = await couponModel.find().populate({
        path:'addedBy',
        select:'firstName lastName -_id'
    })
    return res.status(200).json({message:'Coupons fetched successfully',coupons})
})



// ===============================get a specific coupon =========================
export const getACoupon = asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    const couponExist = await couponModel.findById(id).populate({
        path:'addedBy',
        select:'firstName lastName -_id'
    })
    if(!couponExist){
        return next(new AppError('Coupon not found',404))
        }
        return res.status(200).json({message:'Coupon fetched successfully',couponExist})
})