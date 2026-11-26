
import { PORT } from "./config/config.js";
import express from "express";
import connectDB from "./DB/conectdb.js";
import userRouter from "./module/User/usercontroller.js";
import { connectredis } from "./DB/connectredis.js";
import messagerouter from "./module/Message/messagecontroller.js";
const app=express();
const port=PORT;
import cors from "cors";



export const bootstrap=async ()=>{
    app.use(express.json());


app.use(cors());
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

