import mongoose, { Document } from "mongoose";
import { Course } from "./course.interface";

export interface SsRegister extends Document {
    readonly start_time: Date;
    readonly end_time: Date;
    readonly student:  mongoose.Schema.Types.Number;
    readonly lab:  string;
    readonly hours:  number;
    readonly faculty: mongoose.Schema.Types.String;
}