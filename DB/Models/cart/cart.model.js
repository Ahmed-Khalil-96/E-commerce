import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[{
        productId:{
            type:Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:1,
        },
        price:{
            type:Number

        }
    }],
    totalPrice:{
        type:Number
    },
    discount:{
        type:Number,
        min:0,
        max:100

    },
    totalPriceAfterDiscount:Number
})



const cartModel = model("Cart",cartSchema)
export default cartModel