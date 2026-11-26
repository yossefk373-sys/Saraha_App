export const Success_responce=({res,statuscode,message="Done",data=undefined})=>{
return res.status(statuscode||200).json({message,data})
}