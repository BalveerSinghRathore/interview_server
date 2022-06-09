"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path = require("path");
var uuid_1 = require("uuid");
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var folderName = "/";
        if (file.fieldname) {
            var preFolderName = file.fieldname.split("-");
            if (preFolderName[1] != null && preFolderName[1] != undefined)
                folderName = "/" + preFolderName[1];
        }
        cb(null, "./upload".concat(folderName));
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        cb(null, (0, uuid_1.v4)() + ext);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
exports.default = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
