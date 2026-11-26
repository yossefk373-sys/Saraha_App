

export const Authorization=(role)=>{
    return (req,res,next)=>{
        if(!role.includes(req.user.role)){
            throw new Error("UnAuthorization",{cause:403});
        }
        next();
    }
}