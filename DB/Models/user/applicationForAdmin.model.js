import { model, Schema } from "mongoose";

const adminApplicationSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    email:{
        type:String,
        required:true

    },
    appliedAt:{
        type:Date,
        default:Date.now
    }

},
{
    versionKey:false
}
)


const adminApplicationModel = model("adminApplication",adminApplicationSchema)
export default adminApplicationModel