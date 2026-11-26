import joi from "joi";
import { Generalrule } from "../../common/middleware/utils/Generalrule.js";


/*     SIGNUP     */
export const Signupschema={
    body:joi.object({
        
        fullname:Generalrule.fullname.required(),
    //    fname: GeneralruleF.fname,
    //     lname: Generalrule.lname,
        email: Generalrule.email.required(),
        password: Generalrule.password.required(),
        cpassword:Generalrule.cpassword.optional(),
        phone:Generalrule.phone.optional(),
        age:Generalrule.age,
        provider:Generalrule.provider,
        
    })
}
/*     LOGIN     */
export const Loginschema={
    body:joi.object({
        email:Generalrule.email.required(),
        password:Generalrule.password.required(),
    })
} 
/*     Refresh_token     */
export const refresh_token={
    headers:Generalrule.tokens
}
/*     Refresh_token     */
export const confirmemailschema={
    body:joi.object({
        email:Generalrule.email.required(),

        Otp:joi.string().required()
    })
}
/*     Resend_otp  */
export const Resendotpschema={
     body:joi.object({
        email:Generalrule.email.required(),
     })
}
