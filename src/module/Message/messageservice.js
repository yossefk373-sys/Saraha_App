import * as dbservice from "../../DB/services/dbservice.js";
import { Messagemodel } from "../../model/message.model.js";
import { usermodel } from "../../model/usermodel.js";

/*    Createmessage    */
export const Createmessage=async(req,res,next)=>{
    const {content,recieverId,attachments}=req.body
    const user=req.user
    const Reciever_Exist=await dbservice.findbyid({
        model:usermodel,
        id: recieverId
    })
    if(!Reciever_Exist){
        throw new Error("Reciever not exist ✖");
    }
    const message=await dbservice.create({
        model:Messagemodel,
        data:{
            content,
            attachments:req.files.map(ele=>ele.path),
            recieverId,
         ...(user ? { senderId: user._id } : {})
        }
    })
    return res.status(201).json({message:"Message send",message})
}

/*  Get_message */
export const Get_message=async(req,res,next)=>{
    const messages=await dbservice.find({
        model:Messagemodel,
        filter:{
            senderId:req.user._id
        },
    option: {
    populate: { 
        path: "senderId", 
        select: "email fname lname",
        options: { virtuals: true } 
    }
}
    })
    return res.status(201).json({message:"DONE",messages})
}

/*  Get_messagebyid*/
export const getbyid = async (req, res, next) => {
    const data = await dbservice.findone({
        model: Messagemodel,
        filter: {
            _id: req.params.id // ابحث بالـ ID بتاع الرسالة مباشرة
        }
    });

    if (!data) {
        return res.status(404).json({ message: "Message not found" });
    }

    return res.status(200).json({ message: "DONE", data });
}