import cartModel from "../../../DB/Models/cart/cart.model.js";
import productModel from "../../../DB/Models/products/products.model.js";
import couponModel from "../../../DB/Models/coupon/coupon.model.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { calcPrice, totalPrice } from "../../utils/calcPrice.js";




// =============================add to cart==============================================================
export const addToCart = asyncHandler(async(req,res,next)=>{

    const {product, quantity}=req.body 
    let flag = false
    const productExist = await productModel.findOne({_id:product})
    if(!productExist){
        return next(new AppError('Product not found',404))
        }
    if(quantity>productExist.stock){
        return next(new AppError('Quantity exceeds stock',404))
    }


    const cartExist = await cartModel.findOne({user:req.user.id})
    if(!cartExist){
        const newCart = await cartModel.create({
            user:req.user.id,
            products:[{productId:product,quantity, price:productExist.price}],
            totalPrice:quantity*productExist.price   
        })
        return res.status(201).json(newCart)
    }
else{

    
    for(const item of cartExist.products){
        if(item.productId == product){
            item.quantity+=quantity
            flag=true
            if(item.quantity>productExist.stock){
                item.quantity-=quantity
                return next(new AppError('Quantity exceeds stock',404))
                
            }
            
        }

        
        
    }
    if(!flag){cartExist.products.push({productId:product, quantity,price:productExist.price})}

}

calcPrice(cartExist)
cartExist.totalPrice=totalPrice
await cartExist.save()
return res.status(200).json(cartExist)


})

// =====================================update product quantity===============================================


export const updateQuantity = asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    let productFound = false
    const {quantity}=req.body
        const productExist = await productModel.findById(id)
        if(!productExist){
            return next(new AppError('Product not found',404))
            }
        if(quantity>productExist.stock){
            return next(new AppError('Quantity exceeds stock',404))
        }
    const cart = await cartModel.findOne({user:req.user.id})
    if(!cart){
        return next(new AppError('Cart not found',404))
        }

    for(const product of cart.products){
        if(product.productId==id){
            product.quantity=quantity
            productFound=true
        }
    }
    if(!productFound){
        return next(new AppError("product is not found in the cart",404))
    }
    
   calcPrice(cart)

cart.totalPrice=totalPrice
await cart.save()
return res.status(200).json(cart)
})


// ==============================================removeCartItem=================================================

export const removeItem = asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const cart = await cartModel.findOneAndUpdate({user:req.user.id},{$pull:{products:{productId:id}}},{new:true})
    if(!cart){
        return next(new AppError('Cart not found',404))
        }
        calcPrice(cart)
        cart.totalPrice=totalPrice;
        await cart.save()
        return res.status(200).json(cart)
        
})

// ====================================get logged user cart===================================
export const getUserCart= asyncHandler(async(req,res,next)=>{

    const cart = await cartModel.findOne({user:req.user.id})
    if(!cart){
        return next(new AppError('Cart not found',404))
        }
        return res.status(200).json(cart)
})

//================== ===================clear cart =============================================
export const clearCart = asyncHandler(async(req,res,next)=>{
    const cart = await cartModel.findOneAndDelete({user:req.user.id},{new:true})
    if(!cart){
        return next(new AppError('Cart not found',404))
        }
        return res.status(200).json({message:'cart cleared successfully',cart})
})



// ================================apply coupon =========================================

export const applyCoupon = asyncHandler(async(req,res,next)=>{
    const{coupon}=req.body
    const couponExist = await couponModel.findOne({code:coupon})
    if(!couponExist){
        return next(new AppError('Invalid coupon',404))
    }
    if(couponExist.endDate<Date.now()){
        return next(new AppError('Coupon expired',404))
    }
    if(couponExist.usedBy.includes(req.user.id)){
        return next(new AppError('Coupon already used',409))
    }
    const cart = await cartModel.findOne({user:req.user.id})
    if(!cart){
        return next(new AppError('Cart not found',404))
    }
        cart.discount=couponExist.amount
        cart.totalPriceAfterDiscount=cart.totalPrice-(cart.totalPrice*couponExist.amount)/100
        await cart.save()
        return res.status(200).json(cart)
})