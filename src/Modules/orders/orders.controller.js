import orderModel from "../../../DB/Models/orders/order.model.js";
import cartModel from "../../../DB/Models/cart/cart.model.js";
import productModel from "../../../DB/Models/products/products.model.js";
import couponModel from "../../../DB/Models/coupon/coupon.model.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const createCashOrder = asyncHandler(async(req,res,next)=>{
    
    const {address,coupon}=req.body
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
        totalPriceAfterDiscount:totalPriceAfterDiscount
    })
    await order.save()

    for (const product of order.products) {
        await productModel.findByIdAndUpdate(product.productId,{$inc:{stock:-product.quantity}})
        
    }
    await couponModel.findOneAndUpdate({code:coupon},{$push:{usedBy:req.user.id}})
    await cartModel.findOneAndDelete({user:req.user.id})
    res.status(201).json({message:"Order created successfully",order})
})