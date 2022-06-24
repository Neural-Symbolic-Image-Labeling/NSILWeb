import { Model, Schema } from "mongoose";

export interface IImageSchema { 
    name: string;
    data: string;
    interpretation: string[];
}

export interface IImageSetSchema {
    name: string;
    images: IImageSchema[];
}

export declare const ImageSchema: Schema<IImageSchema>;
export declare const ImageSetSchema: Schema<IImageSetSchema>;
export declare const ImageSet: Model<IImageSetSchema & Document>;