"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("../config/multer"));
var validation_1 = __importDefault(require("../config/validation"));
var authentication_1 = __importDefault(require("../config/authentication"));
var access_1 = __importDefault(require("../controllers/admin/access"));
var access_2 = __importDefault(require("../validations/admin/access"));
var skill_1 = __importDefault(require("../controllers/admin/skill"));
var skill_2 = __importDefault(require("../validations/admin/skill"));
var user_1 = __importDefault(require("../controllers/admin/user"));
var user_2 = __importDefault(require("../validations/admin/user"));
var router = express_1.default.Router();
// Access
router.post("/login", (0, validation_1.default)(access_2.default.login), access_1.default.login);
// Skill
router.get("/skill", [authentication_1.default, (0, validation_1.default)(skill_2.default.index)], skill_1.default.index);
router.get("/skill/all", [authentication_1.default, (0, validation_1.default)(skill_2.default.indexAll)], skill_1.default.indexAll);
router.post("/skill", [authentication_1.default, (0, validation_1.default)(skill_2.default.store)], skill_1.default.store);
router.patch("/skill/:id", [authentication_1.default, (0, validation_1.default)(skill_2.default.show)], skill_1.default.status);
router.delete("/skill/:id", [authentication_1.default, (0, validation_1.default)(skill_2.default.show)], skill_1.default.destory);
// User
router.get("/user", [authentication_1.default, (0, validation_1.default)(user_2.default.index)], user_1.default.index);
router.get("/user/:id", [authentication_1.default, (0, validation_1.default)(user_2.default.show)], user_1.default.show);
router.post("/user", [
    authentication_1.default,
    multer_1.default.fields([
        {
            name: "img-user",
            maxCount: 1
        },
        {
            name: "img-driving_licence",
            maxCount: 1
        }
    ]),
    (0, validation_1.default)(user_2.default.store)
], user_1.default.store);
router.patch("/user/:id", [
    authentication_1.default,
    multer_1.default.fields([
        {
            name: "img-user",
            maxCount: 1
        },
        {
            name: "img-driving_licence",
            maxCount: 1
        }
    ]),
    (0, validation_1.default)(user_2.default.update)
], user_1.default.update);
router.patch("/user/status/:id", [authentication_1.default, (0, validation_1.default)(user_2.default.status)], user_1.default.status);
router.delete("/user/:id", [authentication_1.default, (0, validation_1.default)(user_2.default.show)], user_1.default.destory);
router.post("/user", [
    authentication_1.default,
    multer_1.default.fields([
        {
            name: "img-user",
            maxCount: 1
        },
        {
            name: "img-driving_licence",
            maxCount: 1
        }
    ]),
    (0, validation_1.default)(user_2.default.store)
], user_1.default.store);
module.exports = router;
