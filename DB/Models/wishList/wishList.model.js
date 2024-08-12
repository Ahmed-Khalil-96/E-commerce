import { Schema, model } from "mongoose";

const wishListSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products:[{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        
    }]
},{
    timestamps: true,
    versionKey: false
})

const wishListModel = model("WishList",wishListSchema)
export default wishListModel