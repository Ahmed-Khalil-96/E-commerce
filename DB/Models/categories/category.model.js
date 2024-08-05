import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minLength:3,
        maxLength:50,
        lowercase:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        maxLength:50,
        trim:true,
        lowercase:true

    },
    addedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    image:{
        secure_url:String,
        public_id:String

    },
    customId:{
        type:String,
    }
},
{timestamps:true,
versionKey:false
}
)

const categoryModel = model("Category",categorySchema)
export default categoryModel