import jwt from "jsonwebtoken";
import * as dbservice from "../../DB/services/dbservice.js";
import { usermodel } from "../../model/usermodel.js";
import { ttl } from "../../DB/services/Cacheservise.js";
import { JWT_SECRET } from "../../config/config.js";



export const Authentication=async(req,res,next)=>{

    const {authentication}=req.headers;
    if(!authentication){
        throw new Error("Authentication required");
    }
    const decode=jwt.verify(authentication,JWT_SECRET);
    if(!decode?.sub){
        throw new Error("invalid token");
    }
    req.user=await dbservice.findone({
        model:usermodel,
        filter:{_id:decode.sub}
    })
    if(!req.user){
        throw new Error("user not found");
    }

    if(req.user?.changecredintialAt?.getTime()>decode?.iat*1000){
        throw new Error("Token expire you must login again 🙌");
    }

    if(await ttl(`Revoke_token::${req.user._id}::${decode.jti}`)>0){
        throw new Error("Tokin invalid you must login again (●'◡'●)");
        
    }


    req.decode = decode


    next();
}