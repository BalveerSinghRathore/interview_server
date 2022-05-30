import { json, NextFunction, Request, Response } from "express";
import * as fs from "fs";
import moment from "moment";

import { paginator } from "../../helper";
import config from "../../config/config";

import User from "../../models/user";

/**
 *
 * @param name
 * @param email
 * @param phone
 * @param phone_code
 * @param about
 * @param education
 * @param dob
 * @param gender
 * @param skills
 * @param dl
 * @param img-user
 * @param img-driving_licence
 *
 * @returns status
 * @returns message
 * @returns image
 *
 */
const store = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "Sorry, user couldn't be saved.";
    let image: string = "";
    let emailExists: Boolean = false;
    let phoneExists: Boolean = false;
    let filesAre: any = null;

    if (req?.files) {
        let filedis: any = req.files;
        filesAre = Object.values(filedis);
    }

    // try {
    let {
        name,
        email,
        phone,
        phone_code,
        about,
        education,
        dob,
        gender,
        skills,
        dl
    } = req.body;

    // check for duplicate account
    const checkEmail = await User.find({ email }).countDocuments();
    if (checkEmail > 0) {
        if (
            filesAre &&
            filesAre[0] &&
            filesAre[0][0] &&
            filesAre[0][0].path &&
            fs.existsSync(filesAre[0][0]?.path)
        ) {
            let filePath: string = filesAre[0][0]?.path;
            fs.unlinkSync(filePath);
        }
        if (
            filesAre &&
            filesAre[1] &&
            filesAre[1][0] &&
            filesAre[1][0]?.path &&
            fs.existsSync(filesAre[1][0]?.path)
        ) {
            let filePath: string = filesAre[1][0]?.path;
            fs.unlinkSync(filePath);
        }
        return res.status(200).json({
            status,
            message:
                "Sorry, email already exists. Please try with different email.",
            image,
            emailExists: true,
            phoneExists
        });
    }

    const checkPhone = await User.find({
        phone: `${phone_code}-${phone}`
    }).countDocuments();
    if (checkPhone > 0) {
        if (
            filesAre &&
            filesAre[0] &&
            filesAre[0][0] &&
            filesAre[0][0].path &&
            fs.existsSync(filesAre[0][0]?.path)
        ) {
            let filePath: string = filesAre[0][0]?.path;
            fs.unlinkSync(filePath);
        }
        if (
            filesAre &&
            filesAre[1] &&
            filesAre[1][0] &&
            filesAre[1][0]?.path &&
            fs.existsSync(filesAre[1][0]?.path)
        ) {
            let filePath: string = filesAre[1][0]?.path;
            fs.unlinkSync(filePath);
        }
        return res.status(200).json({
            status,
            message:
                "Sorry, phone already exists. Please try with different phone.",
            image,
            emailExists,
            phoneExists: true
        });
    }
    // END- check for duplicate account

    let user = new User();

    user.name = name;
    user.email = email;
    user.phone = `${phone_code}-${phone}`;
    user.about = about;
    user.education = education;
    user.gender = gender;
    user.dl = dl;
    if (skills) user._skills = skills.split(",");
    user.dob = moment(dob, config.date_time.date_db).format(
        config.date_time.datetime_db
    );

    if (filesAre && filesAre[0] && filesAre[0][0] && filesAre[0][0].path) {
        user.image = filesAre[0][0]?.path;
    }
    if (filesAre && filesAre[1] && filesAre[1][0] && filesAre[1][0]?.path) {
        user.dl_image = filesAre[1][0]?.path;
    }

    await user.save();

    // return
    status = 1;
    message = "User saved successfully.";

    return res.status(200).json({
        status,
        message,
        image,
        emailExists,
        phoneExists
    });
    /*
    } catch (err) {
        if (
            filesAre &&
            filesAre[0] &&
            filesAre[0][0] &&
            filesAre[0][0].path &&
            fs.existsSync(filesAre[0][0]?.path)
        ) {
            let filePath: string = filesAre[0][0]?.path;
            fs.unlinkSync(filePath);
        }
        if (
            filesAre &&
            filesAre[1] &&
            filesAre[1][0] &&
            filesAre[1][0]?.path &&
            fs.existsSync(filesAre[1][0]?.path)
        ) {
            let filePath: string = filesAre[1][0]?.path;
            fs.unlinkSync(filePath);
        }

        return res.status(500).json({
            status,
            message,
            image,
            emailExists,
            phoneExists,
            err
        });
    }
    */
};

/**
 *
 * @param limit
 * @param page
 * @param search
 * @param order
 *
 * @returns status
 * @returns message
 * @returns user
 * @returns page
 *
 */
const index = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "Sorry, no user found.";
    let user: object[] = [];
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
        let whereCase: object = {
            role: "candidate"
        };
        if (setSearch) {
            whereCase = {
                ...whereCase,
                $or: [
                    { name: { $regex: `.*${setSearch}.*`, $options: "i" } },
                    { email: { $regex: `.*${setSearch}.*`, $options: "i" } },
                    { phone: { $regex: `.*${setSearch}.*`, $options: "i" } }
                ]
            };
        }
        // filter -END

        const cq_user = await User.find(whereCase).count();
        const q_user = await User.find(
            whereCase,
            "_id name email dob gender image status createdAt"
        )
            .sort(setSort)
            .skip(setPage && setPage != 1 ? (setPage - 1) * setLimit : 0)
            .limit(setLimit);
        if (!q_user) {
            // return

            return res.status(200).json({
                status,
                message,
                user,
                pages,
                count
            });
        }

        const result = q_user.map((val) => {
            let image: string = config.app_default.default_img;
            if (val.image && fs.existsSync(val.image)) {
                image = val.image;
            }
            image = `${config.server.app_url}/${image}`;

            return {
                id: val._id,
                name: val.name,
                email: val.email,
                dob: moment(val.dob, config.date_time.datetime_db).format(
                    config.date_time.date
                ),
                gender: val.gender,
                status: val.status && val.status == "active" ? true : false,
                image,
                created_at: moment(
                    val.createdAt,
                    config.date_time.datetime_db
                ).format(config.date_time.datetime)
            };
        });

        pages = paginator(cq_user, setLimit, setPage);

        // return
        status = 1;
        if (result.length) message = "Users fetched successfully.";

        return res.status(200).json({
            status,
            message,
            user: result,
            pages,
            count: cq_user
        });
    } catch (err) {
        return res.status(500).json({
            status,
            message,
            user,
            pages,
            count
        });
    }
};

/**
 *
 * @param id
 *
 * @returns status
 * @returns message
 * @returns user
 * @returns skill
 *
 */
const show = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "Sorry, user not found.";
    let user: object = {};
    let skill: any = [];
    let skillIds: any = [];

    try {
        const q_user = await User.findOne({ _id: req.params.id }).populate({
            path: "_skills",
            select: "_id name"
        });
        if (!q_user) {
            // return

            return res.status(200).json({
                status,
                message,
                user,
                skill
            });
        }

        let image: string = config.app_default.default_img;
        if (q_user.image && fs.existsSync(q_user.image)) {
            image = q_user.image;
        }
        image = `${config.server.app_url}/${image}`;

        let imagedl: string = config.app_default.default_img;
        if (q_user.dl_image && fs.existsSync(q_user.dl_image)) {
            imagedl = q_user.dl_image;
        }
        imagedl = `${config.server.app_url}/${imagedl}`;

        if (q_user._skills && q_user._skills.length > 0)
            q_user._skills?.forEach((item: any) => {
                skillIds.push(item._id);
                if (item.name) skill.push({ id: item._id, name: item.name });
            });
        const setPhone = q_user?.phone.split("-");

        // return
        status = 1;
        message = "User fetch successfully.";
        user = {
            id: q_user?._id || "",
            name: q_user?.name || "",
            email: q_user?.email || "",
            phone: setPhone[1] || "",
            phone_code: setPhone[0] || "",
            gender: q_user?.gender || "",
            about: q_user?.about || "",
            education: q_user?.education || "",
            dob: q_user?.dob
                ? moment(q_user.dob, config.date_time.datetime_db).format(
                      config.date_time.date_db
                  )
                : "",
            image,
            dl: q_user?.dl || "",
            imagedl,
            skill_ids: skillIds,
            status: q_user?.status && q_user.status == "active" ? true : false,
            created_at: moment(
                q_user.createdAt,
                config.date_time.datetime_db
            ).format(config.date_time.datetime)
        };

        return res.status(200).json({
            status,
            message,
            user,
            skill
        });
    } catch (err) {
        message = "Sorry, user not found.";
        return res.status(500).json({
            status,
            message,
            user,
            skill
        });
    }
};

/**
 *
 * @param id
 *
 * @param name
 * @param email
 * @param phone
 * @param phone_code
 * @param about
 * @param education
 * @param dob
 * @param gender
 * @param skills
 * @param dl
 * @param img-user
 * @param img-driving_licence
 *
 * @returns status
 * @returns message
 * @returns image
 *
 */
const update = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "Sorry, user couldn't be saved.";
    let image: string = "";
    let emailExists: Boolean = false;
    let phoneExists: Boolean = false;
    let filesAre: any = null;

    if (req?.files) {
        let filedis: any = req.files;
        filesAre = Object.values(filedis);
    }

    try {
        const q_user = await User.findOne(
            { _id: req.params.id },
            "_id image dl_image"
        );
        if (!q_user) {
            // return
            message = "Sorry, user not found.";

            return res.status(200).json({
                status,
                message,
                image,
                emailExists: true,
                phoneExists
            });
        }
        let {
            name,
            email,
            phone,
            phone_code,
            about,
            education,
            dob,
            gender,
            skills,
            dl
        } = req.body;

        // check for duplicate account
        const checkEmail = await User.find({
            _id: { $ne: req.params.id },
            email
        }).countDocuments();
        if (checkEmail > 0) {
            if (
                filesAre &&
                filesAre[0] &&
                filesAre[0][0] &&
                filesAre[0][0].path &&
                fs.existsSync(filesAre[0][0]?.path)
            ) {
                let filePath: string = filesAre[0][0]?.path;
                fs.unlinkSync(filePath);
            }
            if (
                filesAre &&
                filesAre[1] &&
                filesAre[1][0] &&
                filesAre[1][0]?.path &&
                fs.existsSync(filesAre[1][0]?.path)
            ) {
                let filePath: string = filesAre[1][0]?.path;
                fs.unlinkSync(filePath);
            }
            return res.status(200).json({
                status,
                message:
                    "Sorry, email already exists. Please try with different email.",
                image,
                emailExists: true,
                phoneExists
            });
        }

        const checkPhone = await User.find({
            _id: { $ne: req.params.id },
            phone: `${phone_code}-${phone}`
        }).countDocuments();
        if (checkPhone > 0) {
            if (
                filesAre &&
                filesAre[0] &&
                filesAre[0][0] &&
                filesAre[0][0].path &&
                fs.existsSync(filesAre[0][0]?.path)
            ) {
                let filePath: string = filesAre[0][0]?.path;
                fs.unlinkSync(filePath);
            }
            if (
                filesAre &&
                filesAre[1] &&
                filesAre[1][0] &&
                filesAre[1][0]?.path &&
                fs.existsSync(filesAre[1][0]?.path)
            ) {
                let filePath: string = filesAre[1][0]?.path;
                fs.unlinkSync(filePath);
            }
            return res.status(200).json({
                status,
                message:
                    "Sorry, phone already exists. Please try with different phone.",
                image,
                emailExists,
                phoneExists: true
            });
        }
        // END- check for duplicate account

        let setUser = Object.create({});

        setUser.email = email;
        setUser.phone = `${phone_code}-${phone}`;
        setUser.name = name;
        setUser.about = about;
        setUser.education = education;
        setUser.gender = gender;
        setUser.dl = dl;
        setUser._skills = skills.split(",");
        setUser.dob = moment(dob, config.date_time.date_db).format(
            config.date_time.datetime_db
        );

        if (filesAre && filesAre[0] && filesAre[0][0] && filesAre[0][0].path) {
            setUser.image = filesAre[0][0]?.path;

            if (q_user.image && fs.existsSync(q_user.image)) {
                fs.unlinkSync(q_user.image);
            }
        }
        if (filesAre && filesAre[1] && filesAre[1][0] && filesAre[1][0]?.path) {
            setUser.dl_image = filesAre[1][0]?.path;

            if (q_user.dl_image && fs.existsSync(q_user.dl_image)) {
                fs.unlinkSync(q_user.dl_image);
            }
        }

        await User.updateOne({ _id: req.params.id }, setUser);

        // return
        status = 1;
        message = "User saved successfully.";

        return res.status(200).json({
            status,
            message,
            image
        });
    } catch (err) {
        if (req.file && req.file.path && fs.existsSync(req.file?.path)) {
            fs.unlinkSync(req.file?.path);
        }
        return res.status(500).json({
            status,
            message,
            image,
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
const status = async (req: Request, res: Response, next: NextFunction) => {
    let status: number = 0;
    let message: string = "Sorry, user status couldn't be saved.";

    try {
        const q_user = await User.findOne({ _id: req.params.id }, "status");
        if (!q_user) {
            // return
            message = "Sorry, user not found.";

            return res.status(200).json({
                status,
                message
            });
        }

        await User.findByIdAndUpdate(req.params.id, {
            status: q_user.status == "active" ? "de-active" : "active"
        });

        // return
        status = 1;
        message =
            q_user.status == "active"
                ? "User account deactivated successfully."
                : "User account activated successfully.";

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
    let message: string = "Sorry, user not found.";

    try {
        const q_user = await User.findOne({ _id: req.params.id }, "image");
        if (!q_user) {
            // return

            return res.status(200).json({
                status,
                message
            });
        }

        // return
        status = 1;
        message = "User delete successfully.";

        if (q_user.image && fs.existsSync(q_user.image)) {
            fs.unlinkSync(q_user.image);
        }

        await User.deleteOne({ _id: req.params.id });

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

export default { store, index, show, update, status, destory };
