import { model, Schema } from "mongoose";

export const couponSchema = new Schema({
    code:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:20,
        lowercase:true
    },
    amount:{
        type:Number,
        required:true,
        min:1,
        max:100,
    },
    addedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
},
    usedBy:[{
        type:Schema.Types.ObjectId,
        red:"User"
    }]

},{
    timestamps:true,
    versionKey:false
})


const couponModel = model("Coupon",couponSchema)
export default couponModel
