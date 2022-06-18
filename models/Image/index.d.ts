import { Model, Schema } from "mongoose";

export interface IImageSchema { 
    name: string;
    data: Buffer;
}

export declare const ImageSchema: Schema<IImageSchema>;
export declare const Image: Model<IImageSchema & Document>;