import multer from "multer";
import {randomUUID} from "crypto"
import fs from "node:fs"
import {resolve} from "node:path"

export const filevalidate={
    image:[`image/jpeg`,`image/png`,`image/gif`],
    file:["application/pdf", "application/json"]
}


export const localfileupload=({custompath="general",validation=[]}={})=>{
    const fullpath=resolve(`uploads/${custompath}`)
    if(!fs.existsSync(fullpath)){
    fs.mkdirSync(fullpath,{recursive:true})
    }
    const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,randomUUID() +" - "+ file.originalname)
    }
})

function fileFilter(req,file,cb){
    if(validation.includes(file.mimetype)){
        cb(null,true)
    }else{
        throw new Error("invlid file",false);
        
    }
}
return multer({fileFilter,storage})
} 