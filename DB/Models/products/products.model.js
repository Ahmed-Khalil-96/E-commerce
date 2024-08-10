import { model, Schema } from "mongoose";

const productSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minLength:3,
        maxLength:60,
        lowercase:true
    },
    slug:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        minLength:3,
        maxLength:80
    },
    description:{
        type:String,
        required:true,
        trim:true,
        minLength:10,
        maxLength:900,
        },
    addedBy:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
        },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
        },
    subCategory:{
            type:Schema.Types.ObjectId,
            ref:"SubCategory",
            required:true
        },
    brand:{
            type:Schema.Types.ObjectId,
            ref:"Brand",
            required:true
        },
    price:{
        type:Number,
        required:true,
        default:1,
        min:1,
    },
    discount:{
        type:Number,
        default:0,
        min:1,
        max:100
    },
    subPrice:{
        type:Number,
        default:0,
        min:1,
    },
    stock:{
        type:Number,
        default:1,
        min:1,
        },
    customId:String,

    rateAvg:{
        type:Number,
        default:0
        },
    image:{
        secure_url:String,
        public_id:String
        },
    coverImages:[{
        secure_url:String,
        public_id:String
    }],

   
},{
    timestamps:true,
    versionKey:false
})

const productModel = model("Product",productSchema)

export default productModel