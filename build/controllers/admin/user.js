"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var moment_1 = __importDefault(require("moment"));
var helper_1 = require("../../helper");
var config_1 = __importDefault(require("../../config/config"));
var user_1 = __importDefault(require("../../models/user"));
/**
 *
 * @param name
 * @param email
 * @param phone
 * @param phone_code
 * @param education
 * @param dob
 * @param gender
 * @param dl
 * @param skills
 * @param address
 * @param about
 * @param sin
 * @param relocation
 * @param availability
 * @param img-user
 * @param img-driving_licence
 *
 * @returns status
 * @returns message
 * @returns image
 *
 */
var store = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status, message, image, emailExists, phoneExists, filesAre, setCompletion, filedis, _a, name_1, email, phone, phone_code, about, education, dob, gender, skills, sin, address, availability, relocation, dl, checkEmail, filePath, filePath, checkPhone, filePath, filePath, user, err_1, filePath, filePath;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    return __generator(this, function (_v) {
        switch (_v.label) {
            case 0:
                status = 0;
                message = "Sorry, user couldn't be saved.";
                image = "";
                emailExists = false;
                phoneExists = false;
                filesAre = null;
                setCompletion = 0;
                if (req === null || req === void 0 ? void 0 : req.files) {
                    filedis = req.files;
                    filesAre = Object.values(filedis);
                }
                _v.label = 1;
            case 1:
                _v.trys.push([1, 5, , 6]);
                _a = req.body, name_1 = _a.name, email = _a.email, phone = _a.phone, phone_code = _a.phone_code, about = _a.about, education = _a.education, dob = _a.dob, gender = _a.gender, skills = _a.skills, sin = _a.sin, address = _a.address, availability = _a.availability, relocation = _a.relocation, dl = _a.dl;
                return [4 /*yield*/, user_1.default.find({ email: email }).countDocuments()];
            case 2:
                checkEmail = _v.sent();
                if (checkEmail > 0) {
                    if (filesAre &&
                        filesAre[0] &&
                        filesAre[0][0] &&
                        filesAre[0][0].path &&
                        fs.existsSync((_b = filesAre[0][0]) === null || _b === void 0 ? void 0 : _b.path)) {
                        filePath = (_c = filesAre[0][0]) === null || _c === void 0 ? void 0 : _c.path;
                        fs.unlinkSync(filePath);
                    }
                    if (filesAre &&
                        filesAre[1] &&
                        filesAre[1][0] &&
                        ((_d = filesAre[1][0]) === null || _d === void 0 ? void 0 : _d.path) &&
                        fs.existsSync((_e = filesAre[1][0]) === null || _e === void 0 ? void 0 : _e.path)) {
                        filePath = (_f = filesAre[1][0]) === null || _f === void 0 ? void 0 : _f.path;
                        fs.unlinkSync(filePath);
                    }
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: "Sorry, email already exists. Please try with different email.",
                            image: image,
                            emailExists: true,
                            phoneExists: phoneExists
                        })];
                }
                return [4 /*yield*/, user_1.default.find({
                        phone: "".concat(phone_code, "-").concat(phone)
                    }).countDocuments()];
            case 3:
                checkPhone = _v.sent();
                if (checkPhone > 0) {
                    if (filesAre &&
                        filesAre[0] &&
                        filesAre[0][0] &&
                        filesAre[0][0].path &&
                        fs.existsSync((_g = filesAre[0][0]) === null || _g === void 0 ? void 0 : _g.path)) {
                        filePath = (_h = filesAre[0][0]) === null || _h === void 0 ? void 0 : _h.path;
                        fs.unlinkSync(filePath);
                    }
                    if (filesAre &&
                        filesAre[1] &&
                        filesAre[1][0] &&
                        ((_j = filesAre[1][0]) === null || _j === void 0 ? void 0 : _j.path) &&
                        fs.existsSync((_k = filesAre[1][0]) === null || _k === void 0 ? void 0 : _k.path)) {
                        filePath = (_l = filesAre[1][0]) === null || _l === void 0 ? void 0 : _l.path;
                        fs.unlinkSync(filePath);
                    }
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: "Sorry, phone already exists. Please try with different phone.",
                            image: image,
                            emailExists: emailExists,
                            phoneExists: true
                        })];
                }
                user = new user_1.default();
                user.name = name_1;
                if (user.name)
                    setCompletion++;
                user.email = email;
                if (user.email)
                    setCompletion++;
                user.phone = "".concat(phone_code, "-").concat(phone);
                if (user.phone)
                    setCompletion++;
                user.about = about;
                if (user.about)
                    setCompletion++;
                user.education = education;
                if (user.education)
                    setCompletion++;
                user.gender = gender;
                if (user.gender)
                    setCompletion++;
                user.sin = sin;
                if (user.sin)
                    setCompletion++;
                user.address = address;
                if (user.address)
                    setCompletion++;
                user.availability = availability;
                if (user.availability)
                    setCompletion++;
                user.relocation = relocation;
                if (user.relocation)
                    setCompletion++;
                user.dl = dl;
                if (user.dl)
                    setCompletion++;
                if (skills) {
                    setCompletion++;
                    user._skills = skills.split(",");
                }
                user.dob = (0, moment_1.default)(dob, config_1.default.date_time.date_db).format(config_1.default.date_time.datetime_db);
                if (user.dob)
                    setCompletion++;
                if (filesAre && filesAre[0] && filesAre[0][0] && filesAre[0][0].path) {
                    user.image = (_m = filesAre[0][0]) === null || _m === void 0 ? void 0 : _m.path;
                }
                if (user.image)
                    setCompletion++;
                if (filesAre && filesAre[1] && filesAre[1][0] && ((_o = filesAre[1][0]) === null || _o === void 0 ? void 0 : _o.path)) {
                    user.dl_image = (_p = filesAre[1][0]) === null || _p === void 0 ? void 0 : _p.path;
                }
                if (user.dl_image)
                    setCompletion++;
                user.completion = parseFloat(parseFloat(((setCompletion /
                    parseInt(config_1.default.app_default.total_user_fields)) *
                    100).toString()).toFixed(2));
                return [4 /*yield*/, user.save()];
            case 4:
                _v.sent();
                // return
                status = 1;
                message = "User saved successfully.";
                return [2 /*return*/, res.status(200).json({
                        status: status,
                        message: message,
                        image: image,
                        emailExists: emailExists,
                        phoneExists: phoneExists
                    })];
            case 5:
                err_1 = _v.sent();
                if (filesAre &&
                    filesAre[0] &&
                    filesAre[0][0] &&
                    filesAre[0][0].path &&
                    fs.existsSync((_q = filesAre[0][0]) === null || _q === void 0 ? void 0 : _q.path)) {
                    filePath = (_r = filesAre[0][0]) === null || _r === void 0 ? void 0 : _r.path;
                    fs.unlinkSync(filePath);
                }
                if (filesAre &&
                    filesAre[1] &&
                    filesAre[1][0] &&
                    ((_s = filesAre[1][0]) === null || _s === void 0 ? void 0 : _s.path) &&
                    fs.existsSync((_t = filesAre[1][0]) === null || _t === void 0 ? void 0 : _t.path)) {
                    filePath = (_u = filesAre[1][0]) === null || _u === void 0 ? void 0 : _u.path;
                    fs.unlinkSync(filePath);
                }
                return [2 /*return*/, res.status(500).json({
                        status: status,
                        message: message,
                        image: image,
                        emailExists: emailExists,
                        phoneExists: phoneExists,
                        err: err_1
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
/**
 *
 * @param limit
 * @param page
 * @param search
 * @param order
 * @param year
 *
 * @returns status
 * @returns message
 * @returns user
 * @returns page
 *
 */
var index = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status, message, user, pages, count, setSearch, setOrder, setPage, setLimit, setYear, setSort, whereCase, cq_user, q_user, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = 0;
                message = "Sorry, no user found.";
                user = [];
                pages = {};
                count = 0;
                setSearch = "";
                setOrder = "c_d";
                setPage = 0;
                setLimit = 10;
                setYear = "";
                setSort = { createdAt: -1 };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (req.query && req.query.limit && req.query.limit != null) {
                    setLimit = req.query.limit;
                }
                if (req.query && req.query.page) {
                    setPage = req.query.page;
                }
                if (req.query && req.query.keyword && req.query.keyword != null) {
                    setSearch = req.query.keyword;
                }
                if (req.query && req.query.year && req.query.year != null) {
                    setYear = (0, moment_1.default)()
                        .subtract(req.query.year, "years")
                        .format("YYYY-MM-DD HH:mm:ss");
                }
                if (req.query && req.query.order) {
                    setOrder = req.query.order;
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
                whereCase = {
                    role: "candidate"
                };
                if (setYear) {
                    whereCase = __assign(__assign({}, whereCase), { dob: { $lte: setYear } });
                }
                if (setSearch) {
                    whereCase = __assign(__assign({}, whereCase), { $or: [
                            { name: { $regex: ".*".concat(setSearch, ".*"), $options: "i" } },
                            { email: { $regex: ".*".concat(setSearch, ".*"), $options: "i" } },
                            { phone: { $regex: ".*".concat(setSearch, ".*"), $options: "i" } }
                        ] });
                }
                return [4 /*yield*/, user_1.default.find(whereCase).count()];
            case 2:
                cq_user = _a.sent();
                return [4 /*yield*/, user_1.default.find(whereCase, "_id name email dob gender image status completion createdAt")
                        .sort(setSort)
                        .skip(setPage && setPage != 1 ? (setPage - 1) * setLimit : 0)
                        .limit(setLimit)];
            case 3:
                q_user = _a.sent();
                if (!q_user) {
                    // return
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: message,
                            user: user,
                            pages: pages,
                            count: count
                        })];
                }
                result = q_user.map(function (val) {
                    var image = config_1.default.app_default.default_img;
                    if (val.image && fs.existsSync(val.image)) {
                        image = val.image;
                    }
                    image = "".concat(config_1.default.server.app_url, "/").concat(image);
                    return {
                        id: val._id,
                        name: val.name,
                        email: val.email,
                        dob: (0, moment_1.default)(val.dob, config_1.default.date_time.datetime_db).format(config_1.default.date_time.date),
                        gender: val.gender,
                        completion: val.completion,
                        status: val.status && val.status == "active" ? true : false,
                        image: image,
                        created_at: (0, moment_1.default)(val.createdAt, config_1.default.date_time.datetime_db).format(config_1.default.date_time.datetime)
                    };
                });
                pages = (0, helper_1.paginator)(cq_user, setLimit, setPage);
                // return
                status = 1;
                if (result.length)
                    message = "Users fetched successfully.";
                return [2 /*return*/, res.status(200).json({
                        status: status,
                        message: message,
                        user: result,
                        pages: pages,
                        count: cq_user,
                        whereCase: whereCase
                    })];
            case 4:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        status: status,
                        message: message,
                        user: user,
                        pages: pages,
                        count: count
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
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
var show = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status, message, user, skill, skillIds, q_user, image, imagedl, setPhone, err_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                status = 0;
                message = "Sorry, user not found.";
                user = {};
                skill = [];
                skillIds = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({ _id: req.params.id }).populate({
                        path: "_skills",
                        select: "_id name"
                    })];
            case 2:
                q_user = _b.sent();
                if (!q_user) {
                    // return
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: message,
                            user: user,
                            skill: skill
                        })];
                }
                image = config_1.default.app_default.default_img;
                if (q_user.image && fs.existsSync(q_user.image)) {
                    image = q_user.image;
                }
                image = "".concat(config_1.default.server.app_url, "/").concat(image);
                imagedl = config_1.default.app_default.default_img;
                if (q_user.dl_image && fs.existsSync(q_user.dl_image)) {
                    imagedl = q_user.dl_image;
                }
                imagedl = "".concat(config_1.default.server.app_url, "/").concat(imagedl);
                if (q_user._skills && q_user._skills.length > 0)
                    (_a = q_user._skills) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                        skillIds.push(item._id);
                        if (item.name)
                            skill.push({ id: item._id, name: item.name });
                    });
                setPhone = q_user === null || q_user === void 0 ? void 0 : q_user.phone.split("-");
                // return
                status = 1;
                message = "User fetch successfully.";
                user = {
                    id: (q_user === null || q_user === void 0 ? void 0 : q_user._id) || "",
                    name: (q_user === null || q_user === void 0 ? void 0 : q_user.name) || "",
                    email: (q_user === null || q_user === void 0 ? void 0 : q_user.email) || "",
                    phone: setPhone[1] || "",
                    phone_code: setPhone[0] || "",
                    gender: (q_user === null || q_user === void 0 ? void 0 : q_user.gender) || "",
                    about: (q_user === null || q_user === void 0 ? void 0 : q_user.about) || "",
                    education: (q_user === null || q_user === void 0 ? void 0 : q_user.education) || "",
                    sin: (q_user === null || q_user === void 0 ? void 0 : q_user.sin) || "",
                    address: (q_user === null || q_user === void 0 ? void 0 : q_user.address) || "",
                    availability: (q_user === null || q_user === void 0 ? void 0 : q_user.availability) || "",
                    relocation: (q_user === null || q_user === void 0 ? void 0 : q_user.relocation) || "",
                    dob: (q_user === null || q_user === void 0 ? void 0 : q_user.dob)
                        ? (0, moment_1.default)(q_user.dob, config_1.default.date_time.datetime_db).format(config_1.default.date_time.date_db)
                        : "",
                    image: image,
                    dl: (q_user === null || q_user === void 0 ? void 0 : q_user.dl) || "",
                    imagedl: imagedl,
                    skill_ids: skillIds,
                    status: (q_user === null || q_user === void 0 ? void 0 : q_user.status) && q_user.status == "active" ? true : false,
                    created_at: (0, moment_1.default)(q_user.createdAt, config_1.default.date_time.datetime_db).format(config_1.default.date_time.datetime)
                };
                return [2 /*return*/, res.status(200).json({
                        status: status,
                        message: message,
                        user: user,
                        skill: skill
                    })];
            case 3:
                err_3 = _b.sent();
                message = "Sorry, user not found.";
                return [2 /*return*/, res.status(500).json({
                        status: status,
                        message: message,
                        user: user,
                        skill: skill
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
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
var update = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status, message, image, emailExists, phoneExists, filesAre, setCompletion, filedis, q_user, _a, name_2, email, phone, phone_code, about, education, dob, gender, skills, sin, address, availability, relocation, dl, checkEmail, filePath, filePath, checkPhone, filePath, filePath, setUser, err_4;
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    return __generator(this, function (_s) {
        switch (_s.label) {
            case 0:
                status = 0;
                message = "Sorry, user couldn't be saved.";
                image = "";
                emailExists = false;
                phoneExists = false;
                filesAre = null;
                setCompletion = 0;
                if (req === null || req === void 0 ? void 0 : req.files) {
                    filedis = req.files;
                    filesAre = Object.values(filedis);
                }
                _s.label = 1;
            case 1:
                _s.trys.push([1, 6, , 7]);
                return [4 /*yield*/, user_1.default.findOne({ _id: req.params.id }, "_id image dl_image")];
            case 2:
                q_user = _s.sent();
                if (!q_user) {
                    // return
                    message = "Sorry, user not found.";
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: message,
                            image: image,
                            emailExists: true,
                            phoneExists: phoneExists
                        })];
                }
                _a = req.body, name_2 = _a.name, email = _a.email, phone = _a.phone, phone_code = _a.phone_code, about = _a.about, education = _a.education, dob = _a.dob, gender = _a.gender, skills = _a.skills, sin = _a.sin, address = _a.address, availability = _a.availability, relocation = _a.relocation, dl = _a.dl;
                return [4 /*yield*/, user_1.default.find({
                        _id: { $ne: req.params.id },
                        email: email
                    }).countDocuments()];
            case 3:
                checkEmail = _s.sent();
                if (checkEmail > 0) {
                    if (filesAre &&
                        filesAre[0] &&
                        filesAre[0][0] &&
                        filesAre[0][0].path &&
                        fs.existsSync((_b = filesAre[0][0]) === null || _b === void 0 ? void 0 : _b.path)) {
                        filePath = (_c = filesAre[0][0]) === null || _c === void 0 ? void 0 : _c.path;
                        fs.unlinkSync(filePath);
                    }
                    if (filesAre &&
                        filesAre[1] &&
                        filesAre[1][0] &&
                        ((_d = filesAre[1][0]) === null || _d === void 0 ? void 0 : _d.path) &&
                        fs.existsSync((_e = filesAre[1][0]) === null || _e === void 0 ? void 0 : _e.path)) {
                        filePath = (_f = filesAre[1][0]) === null || _f === void 0 ? void 0 : _f.path;
                        fs.unlinkSync(filePath);
                    }
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: "Sorry, email already exists. Please try with different email.",
                            image: image,
                            emailExists: true,
                            phoneExists: phoneExists
                        })];
                }
                return [4 /*yield*/, user_1.default.find({
                        _id: { $ne: req.params.id },
                        phone: "".concat(phone_code, "-").concat(phone)
                    }).countDocuments()];
            case 4:
                checkPhone = _s.sent();
                if (checkPhone > 0) {
                    if (filesAre &&
                        filesAre[0] &&
                        filesAre[0][0] &&
                        filesAre[0][0].path &&
                        fs.existsSync((_g = filesAre[0][0]) === null || _g === void 0 ? void 0 : _g.path)) {
                        filePath = (_h = filesAre[0][0]) === null || _h === void 0 ? void 0 : _h.path;
                        fs.unlinkSync(filePath);
                    }
                    if (filesAre &&
                        filesAre[1] &&
                        filesAre[1][0] &&
                        ((_j = filesAre[1][0]) === null || _j === void 0 ? void 0 : _j.path) &&
                        fs.existsSync((_k = filesAre[1][0]) === null || _k === void 0 ? void 0 : _k.path)) {
                        filePath = (_l = filesAre[1][0]) === null || _l === void 0 ? void 0 : _l.path;
                        fs.unlinkSync(filePath);
                    }
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: "Sorry, phone already exists. Please try with different phone.",
                            image: image,
                            emailExists: emailExists,
                            phoneExists: true
                        })];
                }
                setUser = Object.create({});
                setUser.email = email;
                if (setUser.email)
                    setCompletion++;
                setUser.phone = "".concat(phone_code, "-").concat(phone);
                if (setUser.phone)
                    setCompletion++;
                setUser.name = name_2;
                if (setUser.name)
                    setCompletion++;
                setUser.about = about;
                if (setUser.about)
                    setCompletion++;
                setUser.education = education;
                if (setUser.education)
                    setCompletion++;
                setUser.gender = gender;
                if (setUser.gender)
                    setCompletion++;
                setUser.dl = dl;
                if (setUser.dl)
                    setCompletion++;
                setUser._skills = skills.split(",");
                if (setUser._skills)
                    setCompletion++;
                setUser.dob = (0, moment_1.default)(dob, config_1.default.date_time.date_db).format(config_1.default.date_time.datetime_db);
                if (setUser.dob)
                    setCompletion++;
                setUser.sin = sin;
                if (setUser.sin)
                    setCompletion++;
                setUser.address = address;
                if (setUser.address)
                    setCompletion++;
                setUser.availability = availability;
                if (setUser.availability)
                    setCompletion++;
                setUser.relocation = relocation;
                if (setUser.relocation)
                    setCompletion++;
                if (filesAre && filesAre[0] && filesAre[0][0] && filesAre[0][0].path) {
                    setUser.image = (_m = filesAre[0][0]) === null || _m === void 0 ? void 0 : _m.path;
                    if (q_user.image && fs.existsSync(q_user.image)) {
                        fs.unlinkSync(q_user.image);
                    }
                }
                if (setUser.image)
                    setCompletion++;
                if (filesAre && filesAre[1] && filesAre[1][0] && ((_o = filesAre[1][0]) === null || _o === void 0 ? void 0 : _o.path)) {
                    setUser.dl_image = (_p = filesAre[1][0]) === null || _p === void 0 ? void 0 : _p.path;
                    if (q_user.dl_image && fs.existsSync(q_user.dl_image)) {
                        fs.unlinkSync(q_user.dl_image);
                    }
                }
                if (setUser.dl_image)
                    setCompletion++;
                setUser.completion = parseFloat(parseFloat(((setCompletion /
                    parseInt(config_1.default.app_default.total_user_fields)) *
                    100).toString()).toFixed(2));
                return [4 /*yield*/, user_1.default.updateOne({ _id: req.params.id }, setUser)];
            case 5:
                _s.sent();
                // return
                status = 1;
                message = "User saved successfully.";
                return [2 /*return*/, res.status(200).json({
                        status: status,
                        message: message,
                        image: image
                    })];
            case 6:
                err_4 = _s.sent();
                if (req.file && req.file.path && fs.existsSync((_q = req.file) === null || _q === void 0 ? void 0 : _q.path)) {
                    fs.unlinkSync((_r = req.file) === null || _r === void 0 ? void 0 : _r.path);
                }
                return [2 /*return*/, res.status(500).json({
                        status: status,
                        message: message,
                        image: image,
                        err: err_4
                    })];
            case 7: return [2 /*return*/];
        }
    });
}); };
/**
 *
 * @param id
 *
 * @returns status
 * @returns message
 *
 */
var status = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status, message, q_user, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = 0;
                message = "Sorry, user status couldn't be saved.";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.default.findOne({ _id: req.params.id }, "status")];
            case 2:
                q_user = _a.sent();
                if (!q_user) {
                    // return
                    message = "Sorry, user not found.";
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: message
                        })];
                }
                return [4 /*yield*/, user_1.default.findByIdAndUpdate(req.params.id, {
                        status: q_user.status == "active" ? "de-active" : "active"
                    })];
            case 3:
                _a.sent();
                // return
                status = 1;
                message =
                    q_user.status == "active"
                        ? "User account deactivated successfully."
                        : "User account activated successfully.";
                return [2 /*return*/, res.status(200).json({
                        status: status,
                        message: message
                    })];
            case 4:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        status: status,
                        message: message,
                        err: err_5
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
/**
 *
 * @param id
 *
 * @returns status
 * @returns message
 *
 */
var destory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status, message, q_user, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = 0;
                message = "Sorry, user not found.";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.default.findOne({ _id: req.params.id }, "image")];
            case 2:
                q_user = _a.sent();
                if (!q_user) {
                    // return
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: message
                        })];
                }
                // return
                status = 1;
                message = "User delete successfully.";
                if (q_user.image && fs.existsSync(q_user.image)) {
                    fs.unlinkSync(q_user.image);
                }
                return [4 /*yield*/, user_1.default.deleteOne({ _id: req.params.id })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: status,
                        message: message
                    })];
            case 4:
                err_6 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        status: status,
                        message: message
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = { store: store, index: index, show: show, update: update, status: status, destory: destory };
