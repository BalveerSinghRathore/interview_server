import dotenv from "dotenv";

dotenv.config();

const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    autoIndex: false,
    retryWrites: false
};

const MONGO_URL = process.env.MONGO_URL || "";

const MONGO = {
    options: MONGO_OPTIONS,
    url: MONGO_URL
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME;
const SERVER_PORT = process.env.SERVER_PORT;
const TOKEN_JWT = process.env.TOKEN || "";
const APP_URL = process.env.APP_URL || "";

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token_jwt: TOKEN_JWT,
    app_url: APP_URL
};

const FORMAT_DATE = process.env.FORMAT_DATE || "";
const FORMAT_DATE_DB = process.env.FORMAT_DATE_DB || "";
const FORMAT_DATETIME = process.env.FORMAT_DATETIME || "";
const FORMAT_DATETIME_DB = process.env.FORMAT_DATETIME_DB || "";

const DATE_TIME = {
    date: FORMAT_DATE,
    date_db: FORMAT_DATE_DB,
    datetime: FORMAT_DATETIME,
    datetime_db: FORMAT_DATETIME_DB
};

const COUNT_RECORD = process.env.COUNT_RECORD || "";
const DEFAULT_IMG = process.env.DEFAULT_IMG || "";
const APP_DEFAULT = {
    count_record: COUNT_RECORD,
    default_img: DEFAULT_IMG
};

const config = {
    mongo: MONGO,
    server: SERVER,
    count: COUNT_RECORD,
    date_time: DATE_TIME,
    app_default: APP_DEFAULT,
};

export default config;
