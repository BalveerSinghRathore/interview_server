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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "candidate"],
        default: "candidate"
    },
    about: { type: String, default: null },
    education: { type: String, default: null },
    _skills: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            default: null,
            ref: "Skill"
        }
    ],
    dob: { type: String, default: null },
    gender: {
        type: String,
        enum: ["f", "m"],
        default: "m"
    },
    sin: { type: String, default: null },
    address: { type: String, default: null },
    availability: { type: String, default: null },
    relocation: { type: String, default: null },
    dl: { type: String, default: null },
    dl_image: { type: String, default: null },
    image: { type: String, default: null },
    status: {
        type: String,
        enum: ["active", "pending", "de-active"],
        default: "active"
    },
    password: { type: String, default: null }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("User", UserSchema);
