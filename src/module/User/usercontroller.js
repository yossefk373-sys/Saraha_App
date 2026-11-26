import {Router} from "express";
import { Confirmed_Email, login, Logout_All, profile, Refresh_token, Resend_otp, Signup } from "./userservice.js";
import { Validation } from "../../common/middleware/Validation.js";
import { confirmemailschema, Loginschema, refresh_token, Resendotpschema, Signupschema } from "./uservalidation.js";
import { Roleenum } from "../../common/Enum/userenum.js";
import { Authentication } from "../../common/middleware/Authentication.js";
import { Authorization } from "../../common/middleware/Authorization.js";
import { filevalidate, localfileupload } from "../../common/middleware/Multer.js";
const userRouter=Router();


/*     SIGNUP     */
userRouter.post("/register",
    localfileupload({custompath:"images",validation:filevalidate.image}).fields([{name:"attachment",maxCount:1},{name:"cover",maxCount:1}]),
    Validation(Signupschema),
    Signup)
/*     LOGIN     */
userRouter.post("/login",Validation(Loginschema),login)
/*   Resend_otp   */
userRouter.post("/Resend_otp",Validation(Resendotpschema),Resend_otp)
/*     profile     */
userRouter.get("/profile",Authentication,Authorization(Object.values([Roleenum.user])),profile)
/*   Confirmed_Email   */
userRouter.patch("/Confirmed_Email",Validation(confirmemailschema),Confirmed_Email)
/*     Refresh_token     */
userRouter.post("/Refresh_token",Validation(refresh_token),Refresh_token)
/*     Logout_All     */
userRouter.patch("/log-out",Authentication,Logout_All)
















export default userRouter;