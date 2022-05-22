import multer from "multer";
const path = require("path");
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folderName: string = "/";
        if (file.fieldname) {
            let preFolderName: any = file.fieldname.split("-");
            if (preFolderName[1] != null && preFolderName[1] != undefined)
                folderName = "/" + preFolderName[1];
        }
        cb(null, `./upload${folderName}`);
    },

    filename: function (req: any, file: any, cb: any) {
        const ext = path.extname(file.originalname);
        cb(null, uuidv4() + ext);
    }
});

const fileFilter = (req: any, file: any, cb: any) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};

export default multer({ storage: storage, fileFilter: fileFilter });
