import mongoose, { Schema } from "mongoose";
import ISkill from "../interfaces/skill";

const SkillSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        status: {
            type: String,
            enum: ["active", "de-active"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ISkill>("Skill", SkillSchema);
