import { Document } from "mongoose";

export default interface ISkill extends Document {
    name: string;
    status: "active" | "de-active";
    createdAt: string;
    updatedAt: string;
}
