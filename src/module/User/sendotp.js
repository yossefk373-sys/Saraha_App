import { eventemitter } from "../../common/middleware/utils/Event.js"
import { htmlTemplate } from "../../common/middleware/utils/Eventtemplete.js";
import { Hash } from "../../common/security/Hash.js"
import { generate_otp, sendemail } from "../../common/service/SendEmail.js"
import { Expires, Getvalue, incr, Setvalue, ttl } from "../../DB/services/Cacheservise.js"
import * as dbservice from "../../DB/services/dbservice.js";
import { usermodel } from "../../model/usermodel.js";



export const Sendotp=async({fullname,email,subject,isConfirmed,expirein=20,maxtrails=3,blocksec=300})=>{
    const otp_ttl=await ttl(`USER::${email}`)
    if(otp_ttl>0){
        throw new Error(`you cant resend otp aftrer ${otp_ttl}`);
    }
    const trailsKey = `USER::${email}::Trails`;
    const Max_Trails=await Getvalue ({key:trailsKey})
    if(Max_Trails>=maxtrails){
        throw new Error("Max otp required has reached ✖✖",{cause:429});
    }
    const OTP=await generate_otp()
    const Otp_Hash=await Hash(OTP,12) 
    eventemitter.emit("confirm_email",async()=>{
            await sendemail({
                from:`"Saraha-App" ${email}`,
                to:email,  
                subject:"confirm_email",
                html:htmlTemplate(OTP,fullname)
            })
        })
    await Setvalue({
                key:`USER::${email}`,
                value:Otp_Hash,
                ttl:expirein
            })
    const Trails=await incr(trailsKey)??0
    if(Trails==3){
        await Expires({key:trailsKey,ttl:blocksec})
    }
    
}