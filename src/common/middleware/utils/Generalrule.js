import joi from "joi";
import { Types } from "mongoose";



export const Generalrule={
    id:joi.string().custom((value,help)=>{
    return Types.ObjectId.isValid(value) ? value :help.message("invalid id  ✖")
    }),
    fullname:joi.string().min(3).max(30),
    // fname:joi.string().min(3).max(30).optional(),
    // lname:joi.string().min(3).max(30).optional(),
    email:joi.string().email({minDomainSegments:2,tlds:{allow:["com","yahoo"]}}),
    password:joi.string(),
    cpassword:joi.string().valid(joi.ref("password")).messages({"any.only":"password and confirm password must be the same"}),
    phone:joi.string(),
    age:joi.number().integer().min(18).max(100),
    provider:joi.string().valid("system","google"),
    role:joi.string().valid("user","admin"),
    tokens:joi.object({
        authentication:joi.string().required(),
        connection:joi.string(),
        "accept-encoding":joi.string(),
        accept:joi.string(),
        "user-agent":joi.string(),
        host:joi.string(),
        "content-length":joi.string(),
        "postman-token":joi.string(),
    }),
    files:joi.array().items(joi.object({
        fieldname: joi.string(),
        originalname: joi.string(),
        encoding: joi.string(),
        mimetype: joi.string(),
        path: joi.string(),
        destination: joi.string(),
        filename: joi.string(),
        size: joi.number(),}
    )),
}