import { NextFunction, Request, Response } from "express";
import moment from "moment";

import User from "../../models/user";

/**
 *
 *
 * @returns status
 * @returns message
 * @returns bar
 *
 */
const index = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "Sorry, no user found.";
    let merged: any = [];
    let bar: any = [
        {
            _id: 1,
            count: 0
        },
        {
            _id: 2,
            count: 0
        },
        {
            _id: 3,
            count: 0
        },
        {
            _id: 4,
            count: 0
        },
        {
            _id: 5,
            count: 0
        },
        {
            _id: 6,
            count: 0
        },
        {
            _id: 7,
            count: 0
        },
        {
            _id: 8,
            count: 0
        },
        {
            _id: 9,
            count: 0
        },
        {
            _id: 10,
            count: 0
        },
        {
            _id: 11,
            count: 0
        },
        {
            _id: 12,
            count: 0
        }
    ];

    try {
        const q_user = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" }
                }
            },
            {
                $match: {
                    year: { $gte: moment().year() }
                }
            },
            {
                $group: {
                    _id: "$month",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);

        if (!q_user) {
            // return

            return res.status(200).json({
                status,
                message,
                merged
            });
        }

        for (let i = 0; i < bar.length; i++) {
            merged.push({
                ...bar[i],
                ...q_user.find((itmInner) => itmInner._id === bar[i]._id)
            });
        }

        // return
        status = 1;
        message = "Users fetched successfully.";

        return res.status(200).json({
            status,
            message,
            merged: merged.map((j: any) => j.count)
        });
    } catch (err) {
        return res.status(500).json({
            status,
            message,
            merged
        });
    }
};

export default { index };
