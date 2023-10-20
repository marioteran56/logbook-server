import mongoose from "mongoose";

export class CreateSsRegisterDto {
    readonly start_time: Date;
    readonly end_time: Date;
    readonly student:  mongoose.Schema.Types.Number;
    readonly lab:  string;
    readonly hours:  number;
    readonly faculty: mongoose.Schema.Types.String;
}
