import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[{
        title:{
            type:String,
            required:true,
            trim:true
        },

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
        city:{
            type:String,
            required:[true,"City is required"],
            trim:true,

        },
        state:{
            type:String,
            required:[true,"State is required"],
            trim:true,
            },
        street:{
            type:String,
            required:[true,"Street is required"],
            trim:true,
            },
            buildingNumber:{
                type:String,
                required:[true,"Building number is required"],
                trim:true,
            },
            flatNumber:{
                type:String,
                required:[true,"Flat number is required"],
                trim:true,
            },
        zipCode:{
                type:String,
                required:[true,"Zip is required"],
                trim:true,
            },
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