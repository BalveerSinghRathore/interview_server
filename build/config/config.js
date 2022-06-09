"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};
var MONGO_URL = process.env.MONGO_URL || "";
var MONGO = {
    options: MONGO_OPTIONS,
    url: MONGO_URL
};
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
var SERVER_PORT = process.env.SERVER_PORT;
var TOKEN_JWT = process.env.TOKEN || "";
var APP_URL = process.env.APP_URL || "";
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token_jwt: TOKEN_JWT,
    app_url: APP_URL
};
var FORMAT_DATE = process.env.FORMAT_DATE || "";
var FORMAT_DATE_DB = process.env.FORMAT_DATE_DB || "";
var FORMAT_DATETIME = process.env.FORMAT_DATETIME || "";
var FORMAT_DATETIME_DB = process.env.FORMAT_DATETIME_DB || "";
var DATE_TIME = {
    date: FORMAT_DATE,
    date_db: FORMAT_DATE_DB,
    datetime: FORMAT_DATETIME,
    datetime_db: FORMAT_DATETIME_DB
};
var COUNT_RECORD = process.env.COUNT_RECORD || "";
var DEFAULT_IMG = process.env.DEFAULT_IMG || "";
var APP_DEFAULT = {
    count_record: COUNT_RECORD,
    default_img: DEFAULT_IMG
};
var config = {
    mongo: MONGO,
    server: SERVER,
    count: COUNT_RECORD,
    date_time: DATE_TIME,
    app_default: APP_DEFAULT
};
exports.default = config;
