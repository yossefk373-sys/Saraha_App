import { randomUUID } from "crypto";
import { eventemitter } from "../../common/middleware/utils/Event.js";
import { htmlTemplate } from "../../common/middleware/utils/Eventtemplete.js";
import { Encrypt } from "../../common/security/Encryption.js";
import { Compare, Hash } from "../../common/security/Hash.js";
import { generate_otp, sendemail } from "../../common/service/SendEmail.js";
import { Deletevlue, Getvalue, Setvalue } from "../../DB/services/Cacheservise.js";
import { usermodel } from "../../model/usermodel.js";
import * as dbservice from "../../DB/services/dbservice.js";
import jwt from "jsonwebtoken"
import { Sendotp } from "./sendotp.js";
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from "../../config/config.js";





/*     SIGNUP     */
export const Signup=async(req,res,next)=>{
    const {fname,lname,fullname,email,password,gender,phone,image,cover}=req.body;
    const emailExist=await dbservice.findone({
        model:usermodel,
        filter:{email}
    })
    if(emailExist){
    throw new Error("email already exist ");
    }
   await Sendotp({email,fullname})
   
    const data=await dbservice.create({
model:usermodel,
data:{
            fullname,
            email,
            password: await Hash(password),
            phone: phone ? Encrypt(phone) : undefined,
            image: req.files?.attachment ? req.files.attachment[0].path : undefined,
            cover: req.files?.cover ? req.files.cover[0].path : undefined,
}
 })
 return res.status(201).json({message:"user created successfully",data})

}

/*     Resend_otp     */
export const Resend_otp=async(req,res,next)=>{
    const {email}=req.body
    await Sendotp({email,subject:"Resend_otp",isConfirmed: false})
    return res.status(200).json("Resend_otp done ✔")

}

/*     Confirmed_Email     */
export const Confirmed_Email = async (req, res, next) => {
    const { Otp, email } = req.body;

    const Otp_Value = await Getvalue({ key: `USER::${email}` });
    
    if (!Otp_Value) {
        throw new Error("Token Expired XX");
    }
    
    if (!Otp_Value || !Compare(Otp, Otp_Value)) {
        throw new Error("Invalid Token (๑'◡'๑)☆");
    }

    const user = await dbservice.findoneandupdate({
        model: usermodel,
        filter: { email, isConfirmed: false },
        update: {
            isConfirmed: true
        }
    });

    if (!user) {
        throw new Error("User not Exist || already confirmed XX");
    }

return res.status(201).json({message:"Email Confirmed 🌹",user})
};

/*     LOGIN     */
export const login=async(req,res,next)=>{
    const {email,password}=req.body
    const user=await dbservice.findone({
    model:usermodel,
    filter:{email,isConfirmed:true}
})
if(!user){
    throw new Error("user not found || you are not confirmed (❁´◡`❁)");
}   
if(!await Compare(password,user.password)){
throw new Error("invalid password");
}
const tokenid=randomUUID()
const access_token=jwt.sign({sub:user.id,email},JWT_SECRET,{expiresIn:60,jwtid:tokenid})
const refresh_token=jwt.sign({sub:user.id,email},REFRESH_TOKEN_SECRET,{jwtid:tokenid})

return res.status(200).json({message:"Done",token:{access_token,refresh_token}})

}

/*     profile     */
export const profile=async(req,res,next)=>{
    const user =req.user
    return res.status(200).json({message:"Done",data:user})
}

/*   Refresh_token  */
export const Refresh_token=async(req,res,next)=>{
    const{authentication}=req.headers
    if(!authentication){
        throw new Error("token not found");
    }
    const decode=jwt.verify(authentication,REFRESH_TOKEN_SECRET)
    if(!decode?.sub){
        throw new Error("invalid token");
    }
    const user=await dbservice.findone({ 
        model:usermodel,
        filter:{_id:decode.sub}
        })
        if(!user){
        throw new Error("user not found");
        }
        const access_token=jwt.sign({sub:user.id},JWT_SECRET,{expiresIn:60})
return res.status(200).json({message:"Done",token:{access_token}})


}



/*   Logout_All  */
export const Logout_All=async(req,res,next)=>{
    const {flag}=req.query
    if(flag=="all"){
        req.user.changecredintialAt=new Date()
        await req.user.save()
        await Deletevlue(await keys(`Revoke_token::${req.user._id}`))
    }else{
        await Setvalue({
            key:`Revoke_token::${req.user._id}::${req.decode.jti}`,
            value:`${req.decode.jti}`,
            ttl:req.decode.exp - Math.floor((Date.now()/1000))
        })
    }
    return res.status(200).json("Logout done")


}
