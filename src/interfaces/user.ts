import { Document } from "mongoose";

export default interface IUser extends Document {
    email: string;
    phone: string;
    name: string;
    role: "admin" | "candidate";
    about?: string;
    education?: string;
    _skills?: string[];
    dob?: string;
    gender?: "f" | "m";
    dl?: string;
    dl_image?: string;
    image?: string;
    status: "active" | "pending" | "de-active";
    password?: string;
    createdAt: string;
    updatedAt: string;
}
