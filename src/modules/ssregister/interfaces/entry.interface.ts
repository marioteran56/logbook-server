import mongoose, { Document } from "mongoose";
import { Course } from "./course.interface";

export interface Entry extends Document {
    readonly start_time: Date;
    readonly end_time: Date;
    course:  Course;
    readonly student:  mongoose.Schema.Types.Number;
    readonly lab:  string;
}