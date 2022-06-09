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
var index = yup.object({
    query: yup.object({
        id: yup.string().max(150).nullable(),
        page: yup.number().positive().integer().required(),
        limit: yup.number().positive().integer().required(),
        search: yup.string().nullable()
    })
});
var indexAll = yup.object({
    query: yup.object({
        order: yup.mixed().oneOf(["c_d", "n_a", "n_d", "c_a"]).required()
    })
});
var show = yup.object({
    params: yup.object({
        id: yup.string().max(150).nullable()
    })
});
var store = yup.object({
    body: yup.object({
        name: yup.string().max(355).required()
    })
});
module.exports = { index: index, show: show, store: store, indexAll: indexAll };
