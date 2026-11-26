
import { ALLOW_ORIGIN, PORT } from "./config/config.js";
import helmet from "helmet";
import cors from "cors";
import express from "express";
import connectDB from "./DB/conectdb.js";
import userRouter from "./module/User/usercontroller.js";
import { connectredis } from "./DB/connectredis.js";
import messagerouter from "./module/Message/messagecontroller.js";
import rateLimit from "express-rate-limit";
const app=express();
const port=PORT;
const limiter=rateLimit({
    windowMs:60*1000,
    limit:10,
    message:{
        success:false,
        message:"you reached max request ✖"
    }
})


export const bootstrap=async ()=>{
    app.use(express.json());


// app.use(cors({
//     origin:function(origin,callback){
//         if(ALLOW_ORIGIN.includes(origin)){
//             callback(null,true)
//         }else{
//             callback(new Error("not allow by origin")
//             )
//         }
//     }
// }));
app.use(helmet())
app.use(limiter)
 
app.use("/uploads",express.static("./uploads"))
    await connectDB();
    await connectredis()


    app.use("/user",userRouter)
    app.use("/message",messagerouter)



    app.get("/",(req,res,next)=>{
        res.send("welcome to saraha app");
    })

    app.use("{/*demo}",(req,res,next)=>{
      res.status(404).json({message:`url ${req.originalUrl} not found`});
    })
    app.use((err,req,res,next)=>{
        res.status(err.cause||500).json({msg:err.message,stack:err.stack})
    })
    app.listen(port,()=>{
    console.log(`server is running on port ${port} 🤞`)
    })
}

