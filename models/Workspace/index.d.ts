import { Model, ObjectId, Schema } from "mongoose";

export interface IImageLabelSchema {
    label: string;
    confidence: number;
    segTarget: string;
}

export interface IImageMetaDataSchema {
    imageId: ObjectId;
    url: string;
    label: IImageLabelSchema[];
    name: string;
    canvas: Object | string;
    manual: boolean;
}

export interface IClauseSchema { 
    value: string;
    isLocked: boolean;
}

export interface IStatisticsSchema { 
    total: number;
    unlabeled: number;
    manual: number;
    userChecked: number;
    autoLabeled: number;
}

export interface IRuleSchema { 
    name: string;
    value: [IClauseSchema];
}

export interface IImageCollectionSchema { 
    name: string;
    method: "Classification" | "Segmentation";
    images: IImageMetaDataSchema[];
    statistics: IStatisticsSchema;
    rules: IRuleSchema[];
}

export interface IWorkspaceSchema { 
    name: string;
    collections: IImageCollection[];
}

export declare const ImageMetaDataSchema: Schema<IImageMetaDataSchema>;
export declare const ClauseSchema: Schema<IClauseSchema>;
export declare const ImageLabelSchema: Schema<IImageLabelSchema>;
export declare const StatisticsSchema: Schema<IStatisticsSchema>;
export declare const ImageCollectionSchema: Schema<IImageCollectionSchema>;
export declare const WorkspaceSchema: Schema<IWorkspaceSchema>;
export declare const RuleSchema: Schema<IRuleSchema>;

export declare const Workspace: Model<IWorkspaceSchema & Document>;