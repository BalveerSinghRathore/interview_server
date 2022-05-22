import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "../config/config";

import User from "../models/user";

export default async (req: any, res: Response, next: NextFunction) => {
    try {
        let tokeValIs = config.server.token_jwt;

        let bearerHeader = req.headers["authorization"];

        if (!bearerHeader) {
            return res.status(401).send({
                message: "A token is required for authentication"
            });
        }
        let bearer = bearerHeader.split(" ");
        let token = bearer[1];

        let userValue: any = verify(token, tokeValIs);
        let q_user = await User.findById(userValue.user_id, "status");
        if (!q_user || q_user.status != "active") {
            return res.status(401).send({
                status: 402,
                message: "Sorry you account is has been deactivated."
            });
        }

        req.authenticate = userValue;
    } catch (err) {
        return res.status(401).send({ status: 401, message: "Invalid Token" });
    }

    return next();
};
