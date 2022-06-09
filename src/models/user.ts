import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";

const UserSchema: Schema = new Schema(
    {
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
                type: mongoose.Schema.Types.ObjectId,
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
        completion: { type: Number, default: null },
        status: {
            type: String,
            enum: ["active", "pending", "de-active"],
            default: "active"
        },
        password: { type: String, default: null }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUser>("User", UserSchema);
