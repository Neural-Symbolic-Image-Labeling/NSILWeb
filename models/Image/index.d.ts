import { Model, ObjectId, Schema } from "mongoose";

export interface IImageSchema { 
    name: string;
    data: string;
    interpretation: string[];
}

export interface IImageSetSchema {
    name: string;
    images: ObjectId[];
}

export declare const ImageSchema: Schema<IImageSchema>;
export declare const ImageSetSchema: Schema<IImageSetSchema>;
export declare const ImageSet: Model<IImageSetSchema & Document>;
export declare const Image: Model<IImageSchema & Document>;