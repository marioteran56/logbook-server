import { Document } from "mongoose";

export interface Faculty extends Document {
    readonly _id: string;
    readonly name: string;
}