import { NextFunction, Request, Response } from "express";

export default (schema: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req);
            next();
        } catch (err: any) {
            res.status(400).json({
                status: 0,
                data: 0,
                message: err.message
            });
        }
    };
