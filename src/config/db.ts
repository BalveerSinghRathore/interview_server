import mongoose from "mongoose";
import config from "./config";

export default () =>
    mongoose
        .connect(config.mongo.url, config.mongo.options)
        .then((result) => {
            console.log("Mongo Connected");
        })
        .catch((error) => {
            console.log(error.message, error);
        });
