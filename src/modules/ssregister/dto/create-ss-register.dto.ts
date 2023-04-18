import mongoose from "mongoose";
import { Course } from "../interfaces/course.interface";

export class CreateSsRegisterDto {
    readonly start_time: Date;
    readonly end_time: Date;
    readonly student:  mongoose.Schema.Types.Number;
    readonly lab:  string;
    readonly hours:  number;
}
