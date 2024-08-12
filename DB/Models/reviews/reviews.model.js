import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
    comment:{
        type:String,
        required:true,
        trim:true,
        min:3
    },
    rate:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
        }
},
{timestamps:true,
    versionKey:false
})


const reviewModel = model("Review",reviewSchema)

export default reviewModel