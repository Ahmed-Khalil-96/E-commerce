import { model, Schema } from "mongoose";

const brandSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,

    },
    image:{
        
        secure_url:String,
        public_id:String,
    },
    customId:String,
    addedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true,
    versionKey:false
})


const brandModel = model("Brand",brandSchema)
export default brandModel