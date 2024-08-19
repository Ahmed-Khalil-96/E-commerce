import orderModel from "../../../DB/Models/orders/order.model.js";
import cartModel from "../../../DB/Models/cart/cart.model.js";
import productModel from "../../../DB/Models/products/products.model.js";
import couponModel from "../../../DB/Models/coupon/coupon.model.js";
import { AppError } from "../../utils/errorClass.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { createInvoice } from "../../utils/pdf.js";
import sendEmail from "../../services/sendEmail.js";
import Stripe from 'stripe';
const stripe = new Stripe(process.env.stripe_secret);

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
        address:address||req.user.addresses[0],
        totalPrice:cart.totalPrice,
        discount:discount,
        totalPriceAfterDiscount:totalPriceAfterDiscount,
        coupon,
        isPlaced:true
    })
    await order.save()
    req.data={
        model:orderModel,
        id:order._id
    }

    for (const product of order.products) {
        await productModel.findByIdAndUpdate(product.productId,{$inc:{stock:-product.quantity}})
        
    }
    if(coupon){
        await couponModel.findOneAndUpdate({code:coupon},{$push:{usedBy:req.user.id}})
    }
   
    await cartModel.findOneAndDelete({user:req.user.id})

    const invoice = {
        shipping: {
          name: `${req.user.firstName} ${req.user.lastName  }`,
          address:` ${order.address.buildingNumber} ${order.address.street},${order.address.state}`,
          city: order.address.city,
          state: order.address.state,
          country: "Egypt",
          postal_code: order.address.zipCode
        },
        items: order.products,
        subtotal: order.totalPrice,
        paid:order.totalPriceAfterDiscount,
        invoice_nr: order._id,
        date:order.createdAt,
        discount:order.discount||0
      };
      
      createInvoice(invoice, "invoice.pdf");
      await sendEmail(req.user.email,"Order Placed",`<p>Your Order details</p>`,[
        {path:"invoice.pdf",
        contentType:"application/pdf"
        }
      ])
   return res.status(201).json({message:"Order created successfully",order})
})


// =================================checkout session ========================================================
export const createCheckOutSession = asyncHandler(async(req,res,next)=>{
    const {address}=req.body
    const cart = await cartModel.findOne({user:req.user.id})
    if(!cart) return next(new AppError('Cart is empty',400))
    let totalPriceAfterDiscount=cart.totalPriceAfterDiscount||cart.totalPrice
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data:{
            currency: 'egp',
            unit_amount:totalPriceAfterDiscount*100,
            product_data:{
            name:`${req.user.firstName} ${req.user.lastName}`}
          },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.protocol}://${req.headers.host}/orders`,
        cancel_url: `${req.protocol}://${req.headers.host}/cart`,
        customer_email:req.user.email,
        client_reference_id:cart._id.toString(),
        metadata:address

      });

      return res.status(200).json({msg:"Success",session})




})

// ===============================================webhook===============================================================
export const createWebHook =  (req, res) => {
        const sig = req.headers['stripe-signature'];
      
        let event;
        try {
          event = stripe.webhooks.constructEvent(req.body, sig, process.env.endpointSecret);
        } catch (err) {
          res.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }
       
        if (event.type ==="checkout.session.completed") {
        
             checkoutSessionCompleted = event.data.object;
        }
      
        res.status(200).json({msg:"done"});
      };
      


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

// ===================================================cancel order=====================================
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