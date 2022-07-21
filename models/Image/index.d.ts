import { Model, ObjectId, Schema, Mixed } from "mongoose";

export interface IImageSchema { 
    name: string;
    data: string;
    interpretation: any;
}

export interface IImageSetSchema {
    name: string;
    images: ObjectId[];
    worldDict: Mixed;
}

export declare const ImageSchema: Schema<IImageSchema>;
export declare const ImageSetSchema: Schema<IImageSetSchema>;
export declare const ImageSet: Model<IImageSetSchema & Document>;
export declare const Image: Model<IImageSchema & Document>;