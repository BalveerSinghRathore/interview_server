"use strict";
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
var yup = __importStar(require("yup"));
var store = yup.object({
    body: yup.object({
        name: yup.string().max(355).required(),
        email: yup.string().email().max(545).required(),
        phone: yup.string().max(22).required(),
        phone_code: yup.string().max(4).required(),
        about: yup.string().max(1500).required(),
        education: yup.string().max(150).required(),
        dl: yup.string().max(150).required(),
        gender: yup.mixed().oneOf(["m", "f"]).required(),
        dob: yup
            .string()
            .matches(/(\d{4})-(\d{2})-(\d{2})/, "invalid date formate, yyyy-mm-dd")
            .required()
    })
});
var index = yup.object({
    query: yup.object({
        id: yup.string().max(150).nullable(),
        page: yup.number().positive().integer().required(),
        limit: yup.number().positive().integer().required(),
        search: yup.string().nullable()
    })
});
var show = yup.object({
    params: yup.object({
        id: yup.string().max(150).nullable()
    })
});
var status = yup.object({
    params: yup.object({
        id: yup.string().max(150).nullable()
    })
});
var update = yup.object({
    params: yup.object({
        id: yup.string().max(150).nullable()
    }),
    body: yup.object({
        name: yup.string().max(355).required(),
        email: yup.string().email().max(545).required(),
        phone: yup.string().max(22).required(),
        phone_code: yup.string().max(4).required(),
        about: yup.string().max(1500).required(),
        education: yup.string().max(150).required(),
        dl: yup.string().max(150).required(),
        gender: yup.mixed().oneOf(["m", "f"]).required(),
        dob: yup
            .string()
            .matches(/(\d{4})-(\d{2})-(\d{2})/, "invalid date formate, yyyy-mm-dd")
            .required()
    })
});
module.exports = { store: store, index: index, show: show, update: update, status: status };
