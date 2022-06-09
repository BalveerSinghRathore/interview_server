"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("./config"));
exports.default = (function () {
    return mongoose_1.default
        .connect(config_1.default.mongo.url, config_1.default.mongo.options)
        .then(function (result) {
        console.log("Mongo Connected");
    })
        .catch(function (error) {
        console.log(error.message, error);
    });
});
