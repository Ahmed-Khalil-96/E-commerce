import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[{

        productId:{
            type: Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        price:{type:Number,
            required:true
        },
        quantity:{type:Number,required:true}
    }],
    totalPrice:{
        type:Number,
        required:true
    },
    discount:Number ,
    totalPriceAfterDiscount:Number,
    address:{
        city:String,
        street:String,
        houseNumber:String,
        FirstName:String,
        LastName:String,
        phone:String,
        
    },
    paymentMethod:{
        type:String,
        required:true,
        Enum:["card","cash"],
        default:"cash"
    },
    isPlaced:{
        type:Boolean,
        default:false
    },
    isShipped:{
        type:Boolean,
        default:false
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    isDelivered:{
        type:Boolean,
        default:false
    },
    isCanceled:{
        type:Boolean,
        default:false
    },
    canceledBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    coupon:{
        type:String,
    }

   
},{
    timestamps:true,
    versionKey:false
})

const orderModel = model("Order",orderSchema)
export default orderModel