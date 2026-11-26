import joi from "joi";
import { Generalrule } from "../../common/middleware/utils/Generalrule.js";


/*   createmessageshcema   */
export const createmessageshcema={
    body:joi.object({
        content: joi.string().required(),
        attachments:Generalrule.files.max(3).optional(),
        recieverId:Generalrule.id.required(),
        senderId:joi.string()
    })
}