import Joi from "joi";
import { generalFiled, headers } from "../../utils/generalFields.js";


export const adminApproval={
    params:Joi.object({
        id:generalFiled.id.required()
    }),
    headers:generalFiled.headers.required(),
}