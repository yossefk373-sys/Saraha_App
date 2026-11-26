import { randomInt } from "crypto";
import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../../config/config.js";

export const sendemail=async({from,to,subject,html,attachments} )=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:EMAIL,
            pass:PASSWORD
        }
    })
    const info=await transporter.sendMail({
        from,
        to,
        subject,
        html:html||"<b>Hello world</b>",
        attachments:attachments || []
    })
  return info.accepted > 0 ? true :false
    
  
}  
  export const generate_otp=async()=>{
      return randomInt(100000,999999).toString()
  }
