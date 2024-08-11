import orderModel from "../../../DB/Models/orders/order.model.js";
import cartModel from "../../../DB/Models/cart/cart.model.js";
import productModel from "../../../DB/Models/products/products.model.js";
import couponModel from "../../../DB/Models/coupon/coupon.model.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";


// ==================================create order ============================================================
export const createCashOrder = asyncHandler(async(req,res,next)=>{
    
    const {address}=req.body
    const{coupon}= req.query
    const cart = await cartModel.findOne({user:req.user.id})
    if(!cart) return next(new AppError('Cart is empty',400))

        let discount = cart.discount||""
        let totalPriceAfterDiscount=cart.totalPriceAfterDiscount||cart.totalPrice
        
        const order = new orderModel({
        user:req.user.id,
        products:cart.products,
        address,
        totalPrice:cart.totalPrice,
        discount:discount,
        totalPriceAfterDiscount:totalPriceAfterDiscount,
        coupon,
        isPlaced:true
    })
    await order.save()

    for (const product of order.products) {
        await productModel.findByIdAndUpdate(product.productId,{$inc:{stock:-product.quantity}})
        
    }
    if(coupon){
        await couponModel.findOneAndUpdate({code:coupon},{$push:{usedBy:req.user.id}})
    }
   
    await cartModel.findOneAndDelete({user:req.user.id})
    res.status(201).json({message:"Order created successfully",order})
})

// =============================================get own orders============================================================
export const getOwnOrders = asyncHandler(async(req,res,next)=>{

    const orders = await orderModel.find({user:req.user.id}).populate({
        path:"products.productId",
        select:"-_id -slug -addedBy -customId"
    })
    return res.status(200).json(orders)
})


export const getUserOrders =asyncHandler(async(req,res,next)=>{
    const{userId}=req.params
    const orders = await orderModel.find({user:userId}).populate({
        path:"products.productId",
        select:"-_id -slug -addedBy -customId"
    })
    return res.status(200).json(orders)
})

export const getAllOrders = asyncHandler(async(req,res,next)=>{
    const orders = await orderModel.find().populate({
        path:"products.productId",
        select:"-_id -slug -addedBy -customId"
    })
    return res.status(200).json(orders)

})


export const cancelOrder = asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const orderExist = await orderModel.findOne({_id:id,user:req.user.id,isCanceled:false})
    if(!orderExist){
        return res.status(404).json({message:"Order not found"})
    }
    if((orderExist.paymentMethod==="cash"&&orderExist.isShipped===true)||(orderExist.paymentMethod=="card"&&orderExist.isShipped===true)){
        return res.status(400).json({message:"Order cannot be cancelled"})
    }

    orderExist.isCanceled=true
    
    await orderExist.save()

    if(orderExist.coupon){await couponModel.findOneAndUpdate({code:orderExist.coupon},{$pull:{usedBy:req.user.id}})}
  
    for (const product of orderExist.products) {
        await productModel.findByIdAndUpdate(product.productId,{$inc:{stock:product.quantity}})
        
    }
    return res.status(201).json({msg:"order is cancelled successfully"})
})