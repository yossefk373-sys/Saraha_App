import { Router } from "express"
import { Createmessage, Get_message, getbyid } from "./messageservice.js"
import { filevalidate, localfileupload } from "../../common/middleware/Multer.js"
import { Validation } from "../../common/middleware/Validation.js"
import { createmessageshcema } from "./messagevalidation.js"
import { optionalAuthentication } from "../../common/middleware/optionalAuth.js"
import { Authentication } from "../../common/middleware/Authentication.js"
const messagerouter=Router()



/*  create_message */
messagerouter.post("/create_message",optionalAuthentication,localfileupload({
    custompath:"message",
    validation:filevalidate.image
}).array("attachments",3),Validation(createmessageshcema),Createmessage)

/*  get_message */
messagerouter.get("/get_message",Authentication,Get_message)

/*  get_messagebyid */
messagerouter.get("/:id",Authentication,getbyid)










export default messagerouter