import { JWT_SECRET } from "../../config/config.js";
import * as dbservice from "../../DB/services/dbservice.js";
import { usermodel } from "../../model/usermodel.js";
import jwt from "jsonwebtoken";

export const optionalAuthentication = async (req, res, next) => {
    try {
        const { authentication } = req.headers;

       
        if (!authentication) {
            req.user = null;
            return next();
        }


        const decode = jwt.verify(authentication, JWT_SECRET);
        if (!decode?.sub) {
            req.user = null;
            return next();
        }

        const user = await dbservice.findone({
            model: usermodel,
            filter: { _id: decode.sub }
        });

        if (!user) {
            req.user = null;
            return next();
        }

        if (req?.changecredintialAt?.getTime() > decode.iat * 1000) {
            req.user = null;
            return next();
        }

        req.user = user;
        next();

    } catch (error) {
       
        req.user = null;
        next();
    }
};