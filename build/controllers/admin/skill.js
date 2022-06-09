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
var moment_1 = __importDefault(require("moment"));
var helper_1 = require("../../helper");
var config_1 = __importDefault(require("../../config/config"));
var skill_1 = __importDefault(require("../../models/skill"));
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
var index = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status, message, skill, pages, count, setSearch, setOrder, setPage, setLimit, setSort, whereCase, cq_skill, q_skill, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = 0;
                message = "Sorry, skills not found.";
                skill = [];
                pages = {};
                count = 0;
                setSearch = "";
                setOrder = "c_d";
                setPage = 0;
                setLimit = 10;
                setSort = { createdAt: -1 };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                if (req.query && req.query.limit) {
                    setLimit = req.query.limit;
                }
                if (req.query && req.query.page) {
                    setPage = req.query.page;
                }
                if (req.query && req.query.keyword) {
                    setSearch = req.query.keyword;
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
                whereCase = {};
                if (setSearch) {
                    whereCase = __assign(__assign({}, whereCase), { name: { $regex: ".*".concat(setSearch, ".*"), $options: "i" } });
                }
                return [4 /*yield*/, skill_1.default.find(whereCase).count()];
            case 2:
                cq_skill = _a.sent();
                return [4 /*yield*/, skill_1.default.find(whereCase, "_id name status createdAt")
                        .sort(setSort)
                        .skip(setPage && setPage != 1 ? (setPage - 1) * setLimit : 0)
                        .limit(setLimit)];
            case 3:
                q_skill = _a.sent();
                if (!q_skill) {
                    // return
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: message,
                            skill: skill,
                            pages: pages,
                            count: count
                        })];
                }
                result = q_skill.map(function (val) {
                    return {
                        id: val._id,
                        name: val.name,
                        status: val.status && val.status == "active" ? true : false,
                        created_at: (0, moment_1.default)(val.createdAt, config_1.default.date_time.datetime_db).format(config_1.default.date_time.datetime)
                    };
                });
                pages = (0, helper_1.paginator)(cq_skill, setLimit, setPage);
                // return
                status = 1;
                if (result.length)
                    message = "Skills fetched successfully.";
                return [2 /*return*/, res.status(200).json({
                        status: status,
                        message: message,
                        skill: result,
                        pages: pages,
                        count: cq_skill,
                        order: setSort
                    })];
            case 4:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        status: status,
                        message: message,
                        skill: skill,
                        pages: pages,
                        count: count
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
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
var indexAll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status, message, skill, setOrder, setSort, whereCase, q_skill, result, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = 0;
                message = "Sorry, skills not found.";
                skill = [];
                setOrder = "c_d";
                setSort = { createdAt: -1 };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                whereCase = { status: "active" };
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
                return [4 /*yield*/, skill_1.default.find(whereCase, "_id name").sort(setSort)];
            case 2:
                q_skill = _a.sent();
                if (!q_skill) {
                    // return
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: message,
                            skill: skill
                        })];
                }
                result = q_skill.map(function (val) {
                    return {
                        id: val._id,
                        name: val.name
                    };
                });
                // return
                status = 1;
                if (result.length)
                    message = "Skills fetched successfully.";
                return [2 /*return*/, res.status(200).json({
                        status: status,
                        message: message,
                        skill: result
                    })];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        status: status,
                        message: message,
                        skill: skill
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 *
 * @param name
 *
 * @returns status
 * @returns message
 *
 */
var store = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status, message, name_1, skill, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = 0;
                message = "Sorry, skill couldn't be saved.";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                name_1 = req.body.name;
                skill = new skill_1.default();
                skill.name = name_1;
                return [4 /*yield*/, skill.save()];
            case 2:
                _a.sent();
                // return
                status = 1;
                message = "New skill saved successfully.";
                return [2 /*return*/, res.status(200).json({
                        status: status,
                        message: message
                    })];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        status: status,
                        message: message,
                        err: err_3
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 *
 * @param id
 *
 * @returns status
 * @returns current
 * @returns message
 *
 */
var status = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var status, message, id, q_skill, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = 0;
                message = "Sorry, skill status couldn't be saved.";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                id = req.params.id;
                return [4 /*yield*/, skill_1.default.findOne({ _id: id }, "status")];
            case 2:
                q_skill = _a.sent();
                if (!q_skill) {
                    // return
                    message = "Sorry, skill not found.";
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: message
                        })];
                }
                return [4 /*yield*/, skill_1.default.findByIdAndUpdate(req.params.id, {
                        status: q_skill.status == "active" ? "de-active" : "active"
                    })];
            case 3:
                _a.sent();
                // return
                status = 1;
                message =
                    q_skill.status == "active"
                        ? "Skill deactivated successfully."
                        : "Skill activated successfully.";
                return [2 /*return*/, res.status(200).json({
                        status: status,
                        message: message
                    })];
            case 4:
                err_4 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        status: status,
                        message: message,
                        err: err_4
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
    var status, message, q_skill, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                status = 0;
                message = "Sorry, skill not found.";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, skill_1.default.findOne({ _id: req.params.id })];
            case 2:
                q_skill = _a.sent();
                if (!q_skill) {
                    // return
                    return [2 /*return*/, res.status(200).json({
                            status: status,
                            message: message
                        })];
                }
                // return
                status = 1;
                message = "Skill delete successfully.";
                return [4 /*yield*/, skill_1.default.deleteOne({ _id: req.params.id })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        status: status,
                        message: message
                    })];
            case 4:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).json({
                        status: status,
                        message: message
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.default = { index: index, store: store, status: status, destory: destory, indexAll: indexAll };
