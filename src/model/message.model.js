import mongoose from "mongoose";




const Messageschema = new mongoose.Schema({
    content:{
        type:String,
        required:function(){
            return this.attachments?.length >0 ?false :true
        },
        min:3,
        max:50000
    },
    attachments:[String],
    recieverId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    senderId:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }


},{
    timestamps:true,
    strict:true,
    strictQuery:true,
    toJSON:{virtuals:true},
    tojson:{virtuals:true}

})


export const Messagemodel=mongoose.model.Message || mongoose.model("Message",Messageschema)
