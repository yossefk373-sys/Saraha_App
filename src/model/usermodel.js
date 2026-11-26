import mongoose from "mongoose";
import { Genderenum, provider, Roleenum } from "../common/Enum/userenum.js";




const userschema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:Object.values(Genderenum),
        default:Genderenum.male
    },
    age:{
        type:Number,
        min:18,
        max:60
    },
    phone:{
        type:String,

    },
    provider:{
        type:String,
        enum:Object.values(provider),
        default:provider.system
    },
    role:{
        type:String,
        enum:Object.values(Roleenum),
        default:Roleenum.user
    },
    image:String,
    cover:String,
    changecredintialAt:Date,
    isConfirmed:{
    type:Boolean,
    default:false
    }


},{
    timestamps:true,
    strict:true,
    strictQuery:true,
    toJSON:{virtuals:true},
    tojson:{virtuals:true}

})

userschema.virtual("fullname").set(function(value){
const [fname, lname] = value?.split(" ") || [];

    this.set({ fname, lname });
}).get(function(){
    return `${this.fname} ${this.lname}`
})

export const usermodel=mongoose.model.user || mongoose.model("user",userschema)
