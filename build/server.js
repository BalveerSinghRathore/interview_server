"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("./config/config"));
var db_1 = __importDefault(require("./config/db"));
var admin_1 = __importDefault(require("./routes/admin"));
var router = (0, express_1.default)();
console.log("on server..!");
/** Connect to Mongo */
(0, db_1.default)();
/** Parse the body of the request */
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
/** Rules of our API */
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
/** Routes go here */
router.use("/api/admin", admin_1.default);
router.use("/upload", express_1.default.static("./upload"));
/** Error handling */
router.use(function (req, res, next) {
    var error = new Error("Not found");
    res.status(404).json({
        message: error.message
    });
});
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () {
    return console.log("Server is running ".concat(config_1.default.server.hostname, ":").concat(config_1.default.server.port));
});
