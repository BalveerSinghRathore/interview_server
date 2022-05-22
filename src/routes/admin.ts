import express, { NextFunction, Request, Response } from "express";
import upload from "../config/multer";
import validation from "../config/validation";
import auth from "../config/authentication";

import AccessCtl from "../controllers/admin/access";
import AccessValid from "../validations/admin/access";

import SkillCtl from "../controllers/admin/skill";
import SkillValid from "../validations/admin/skill";

import UserCtl from "../controllers/admin/user";
import UserValid from "../validations/admin/user";


const router = express.Router();

// Access

router.post("/login", validation(AccessValid.login), AccessCtl.login);


// Skill

router.get("/skill", [auth, validation(SkillValid.index)], SkillCtl.index);
router.post(
    "/skill",
    [auth, validation(SkillValid.store)],
    SkillCtl.store
);
router.patch(
    "/skill/:id",
    [auth, validation(SkillValid.show)],
    SkillCtl.status
);
router.delete(
    "/skill/:id",
    [auth, validation(SkillValid.show)],
    SkillCtl.destory
);


// User

router.get("/user", [auth, validation(UserValid.index)], UserCtl.index);
router.get("/user/:id", [auth, validation(UserValid.show)], UserCtl.show);
router.post(
    "/user",
    [auth, upload.fields([{
        name: 'img-user', maxCount: 1
      }, {
        name: 'img-driving_licence', maxCount: 1
      }]), validation(UserValid.store)],
    UserCtl.store
);
router.patch(
    "/user/:id",
    [auth, upload.fields([{
        name: 'img-user', maxCount: 1
      }, {
        name: 'img-driving_licence', maxCount: 1
      }]), validation(UserValid.update)],
    UserCtl.update
);
router.patch(
    "/user/status/:id",
    [auth, validation(UserValid.status)],
    UserCtl.status
);
router.delete(
    "/user/:id",
    [auth, validation(UserValid.show)],
    UserCtl.destory
);


router.post(
    "/user",
    [auth, upload.fields([{
        name: 'img-user', maxCount: 1
      }, {
        name: 'img-driving_licence', maxCount: 1
      }]), validation(UserValid.store)],
    UserCtl.store
);

export = router;