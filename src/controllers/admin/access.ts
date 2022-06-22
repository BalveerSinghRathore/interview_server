import { NextFunction, Request, Response } from "express";
import bcrypt = require("bcrypt");

import config from "../../config/config";
import { sign } from "jsonwebtoken";

import User from "../../models/user";

/**
 *
 * @param email
 * @param password
 *
 * @returns status
 * @returns message
 * @returns token
 *
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "";
    let token: string = "";

    try {
        let { email, password } = req.body;

        const q_user = await User.findOne(
            { role: "admin", email },
            "_id password"
        );
        if (!q_user) {
            // return
            message = "Sorry, account not found.";

            return res.status(200).json({
                status,
                message,
                token
            });
        }
        let setPassword = q_user.password || "";
        // check user password with hashed password stored in the database
        const validPassword = await bcrypt.compare(password, setPassword);
        if (!validPassword) {
            // return
            message = "Sorry, invalid password.";

            return res.status(200).json({
                status,
                message,
                token
            });
        }

        token = sign(
            { user_id: q_user._id, role: "admin" },
            config.server.token_jwt,
            {
                expiresIn: "48h"
            }
        );

        // return
        status = 1;
        message = "Logged in successfully.";

        return res.status(200).json({
            status,
            message,
            token
        });
    } catch (err) {
        message = "Sorry, not able to login you.";
        return res.status(500).json({
            status,
            message,
            token
        });
    }
};

export default { login };
