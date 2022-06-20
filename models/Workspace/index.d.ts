import { Model, ObjectId, Schema } from "mongoose";

export interface IImageMetaDataSchema {
    imageId: ObjectId;
    url: string;
    label: string;
    name: string;
    canvas: Object | string;
    manual: boolean;
}

export interface IStatisticsSchema { 
    total: number;
    unlabeled: number;
    manual: number;
    userChecked: number;
    autoLabeled: number;
}

export interface IWorkspaceSchema { 
    name: string;
    images: IImageMetaDataSchema[];
    statistics: IStatisticsSchema;
}

export declare const ImageMetaDataSchema: Schema<IImageMetaDataSchema>;
export declare const StatisticsSchema: Schema<IStatisticsSchema>;
export declare const WorkspaceSchema: Schema<IWorkspaceSchema>;

export declare const Workspace: Model<IWorkspaceSchema & Document>;