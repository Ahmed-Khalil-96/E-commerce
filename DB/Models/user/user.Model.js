import { model, Schema } from "mongoose";

const userSchema = new Schema({
    firstName:{
        type: String,
        required:[true,"First name is required"],
        trim:true,
        Lowercase:true,
        minLength:3,
        maxLength:20,
    },
    lastName:{
        type: String,
        required:[true,"last name is required"],
        trim:true,
        Lowercase:true,
        minLength:3,
        maxLength:20,
    },
    email:{
        type: String,
        required:[true,"Email is required"],
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true,
    },
    phone:{
        type:[String],
        required:[true,"Phone number is required"],
        trim:true,
    },
    address:{
        type:[String],
        required:[true,"Address is required"],
        trim:true,
    },
    gender:{
        type:String,
        required:[true,"Gender is required"],
        enum:["male","female"],
        Lowercase:true
    },
    birthDate:{
        type:Date,
        required:[true,"Birth day is required"],
        
    },
    // nationality:{
    //     type:String,
    //     required:[true,"Nationality is required"],
    //     enum:["Egyptian","Sudanese","Saudian"],
    //     Lowercase:true
    // },
    age:{
        type:Number,
        required:[true,"Age is required"],        
    },
    confirmed:{
        type:Boolean,
        default:false
    },
    loggedIn:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:["admin","user","superAdmin"],
        default:"user"
    },
    OTP:{
        type:String,
    },
    OTPExpires:{
        type:Date,
    },
    passwordChangedAt:{
        type:Date,
        default:0    
    }

},
{timestamps:true,
    versionKey:false
}
)


const userModel = model("User",userSchema)
export default userModel