import Joi from "joi";




const validationObjectId = (value, helper)=>{
    return Types.ObjectId.isValid(value)? true:helper.message("invalid object id")
    }



export const generalFiled = {
        name: Joi.string().required().min(3).max(50).trim(),
        email: Joi.string().email({ tlds: { allow: ["outlook", "com"] }, minDomainSegments: 2 }).required(),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).required(),
        rePassword: Joi.string().valid(Joi.ref("password")).required(),
        id: Joi.string().custom(validationObjectId),
        file: Joi.object({
         size: Joi.number().positive().required(),
            path: Joi.string().required(),
            filename: Joi.string().required(),
            destination: Joi.string().required(),
            mimetype: Joi.string().required(),
            encoding: Joi.string().required(),
            originalname: Joi.string().required(),
            fieldname: Joi.string().required()})
    };
        
    export const headers = {
        headers: Joi.object({
            'cache-control': Joi.string(),
            'postman-token': Joi.string(),
            'content-type': Joi.string(),
            'content-length': Joi.string(),
            host: Joi.string(),
            'user-agent': Joi.string(),
            accept: Joi.string(),
            'accept-encoding': Joi.string(),
            connection: Joi.string(),
            token: Joi.string().required()
        }),
    
    }
    