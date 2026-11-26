import { EventEmitter } from "events"; 

export const eventemitter=new EventEmitter()

eventemitter.on("confirm_email",async(fn)=>{
    fn()
})
eventemitter.on("forget-password",async(fn)=>{
    fn()
})