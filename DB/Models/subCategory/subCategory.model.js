import { model, Schema } from "mongoose";



const subCategorySchema= new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        minLength:3,
        maxLength:50,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        secure_url:String,
        public_id:String
    },
    addedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    customId:String,
},{timestamps:true,
    versionKey:false
})

const subCategoryModel = model("SubCategory",subCategorySchema)
export default subCategoryModel