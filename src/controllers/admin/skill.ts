import { NextFunction, Request, Response } from "express";
import moment from "moment";

import { paginator } from "../../helper";
import config from "../../config/config";

import Skill from "../../models/skill";

/**
 *
 * @param limit
 * @param page
 * @param search
 * @param order
 *
 * @returns status
 * @returns message
 * @returns skill
 * @returns page
 *
 */
const index = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "Sorry, skills not found.";
    let skill: object[] = [];
    let pages: object = {};
    let count: number = 0;

    let setSearch: string = "";
    let setOrder: string = "c_d";
    let setPage: number = 0;
    let setLimit: number = 10;
    let setSort: any = { createdAt: -1 };

    try {
        if (req.query && req.query.limit) {
            setLimit = (req.query as any).limit;
        }
        if (req.query && req.query.page) {
            setPage = (req.query as any).page;
        }
        if (req.query && req.query.keyword) {
            setSearch = (req.query as any).keyword;
        }
        if (req.query && req.query.order) {
            setOrder = (req.query as any).order;
            switch (setOrder) {
                case "n_a":
                    setSort = { name: 1 };
                    break;
                case "n_d":
                    setSort = { name: -1 };
                    break;
                case "c_a":
                    setSort = { createdAt: 1 };
                    break;
            }
        }

        // filter
        let whereCase: object = {};
        if (setSearch) {
            whereCase = {
                ...whereCase,
                name: { $regex: `.*${setSearch}.*`, $options: "i" }
            };
        }
        // filter -END

        const cq_skill = await Skill.find(whereCase).count();
        const q_skill = await Skill.find(whereCase, "_id name status createdAt")
            .sort(setSort)
            .skip(setPage && setPage != 1 ? (setPage - 1) * setLimit : 0)
            .limit(setLimit);
        if (!q_skill) {
            // return

            return res.status(200).json({
                status,
                message,
                skill,
                pages,
                count
            });
        }

        const result = q_skill.map((val: any) => {
            return {
                id: val._id,
                name: val.name,
                status: val.status && val.status == "active" ? true : false,
                created_at: moment(
                    val.createdAt,
                    config.date_time.datetime_db
                ).format(config.date_time.datetime)
            };
        });

        pages = paginator(cq_skill, setLimit, setPage);

        // return
        status = 1;
        if (result.length) message = "Skills fetched successfully.";

        return res.status(200).json({
            status,
            message,
            skill: result,
            pages,
            count: cq_skill,
            order: setSort
        });
    } catch (err) {
        return res.status(500).json({
            status,
            message,
            skill,
            pages,
            count
        });
    }
};

/**
 *
 * @param order
 *
 * @returns status
 * @returns message
 * @returns skill
 * @returns page
 *
 */
const indexAll = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "Sorry, skills not found.";
    let skill: object[] = [];

    let setOrder: string = "c_d";
    let setSort: any = { createdAt: -1 };

    try {
        let whereCase: object = { status: "active" };
        if (req.query && req.query.order) {
            setOrder = (req.query as any).order;
            switch (setOrder) {
                case "n_a":
                    setSort = { name: 1 };
                    break;
                case "n_d":
                    setSort = { name: -1 };
                    break;
                case "c_a":
                    setSort = { createdAt: 1 };
                    break;
            }
        }

        const q_skill = await Skill.find(whereCase, "_id name").sort(setSort);
        if (!q_skill) {
            // return

            return res.status(200).json({
                status,
                message,
                skill
            });
        }

        const result = q_skill.map((val: any) => {
            return {
                id: val._id,
                name: val.name
            };
        });

        // return
        status = 1;
        if (result.length) message = "Skills fetched successfully.";

        return res.status(200).json({
            status,
            message,
            skill: result
        });
    } catch (err) {
        return res.status(500).json({
            status,
            message,
            skill
        });
    }
};

/**
 *
 * @param name
 *
 * @returns status
 * @returns message
 *
 */
const store = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "Sorry, skill couldn't be saved.";

    try {
        let { name } = req.body;

        let skill = new Skill();
        skill.name = name;
        await skill.save();

        // return
        status = 1;
        message = "New skill saved successfully.";

        return res.status(200).json({
            status,
            message
        });
    } catch (err) {
        return res.status(500).json({
            status,
            message,
            err
        });
    }
};

/**
 *
 * @param id
 *
 * @returns status
 * @returns current
 * @returns message
 *
 */
const status = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "Sorry, skill status couldn't be saved.";

    try {
        let { id } = req.params;

        const q_skill = await Skill.findOne({ _id: id }, "status");
        if (!q_skill) {
            // return
            message = "Sorry, skill not found.";

            return res.status(200).json({
                status,
                message
            });
        }

        await Skill.findByIdAndUpdate(req.params.id, {
            status: q_skill.status == "active" ? "de-active" : "active"
        });

        // return
        status = 1;
        message =
            q_skill.status == "active"
                ? "Skill deactivated successfully."
                : "Skill activated successfully.";

        return res.status(200).json({
            status,
            message
        });
    } catch (err) {
        return res.status(500).json({
            status,
            message,
            err
        });
    }
};

/**
 *
 * @param id
 *
 * @returns status
 * @returns message
 *
 */
const destory = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "Sorry, skill not found.";

    try {
        const q_skill = await Skill.findOne({ _id: req.params.id });
        if (!q_skill) {
            // return

            return res.status(200).json({
                status,
                message
            });
        }

        // return
        status = 1;
        message = "Skill delete successfully.";

        await Skill.deleteOne({ _id: req.params.id });

        return res.status(200).json({
            status,
            message
        });
    } catch (err) {
        return res.status(500).json({
            status,
            message
        });
    }
};

export default { index, store, status, destory, indexAll };
