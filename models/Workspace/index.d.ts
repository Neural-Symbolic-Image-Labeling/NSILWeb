import { Model, ObjectId, Schema } from "mongoose";

export interface IImageLabelSchema {
    name: string[];
    canvasId: string;
    mark: { // different for different types of tools, examine property "type" when in use.
        // Properties TBD
        height?: number; // rectangle
        type: string;
        width?: number; // rectangle
        x?: number; // rectangle
        y?: number; // rectangle
    };
}

export interface IImageMetaDataSchema {
    imageId: ObjectId;
    url: string;
    labels: IImageLabelSchema[];
    name: string;
    canvas: Object | string;
    labeled: boolean;
    manual: boolean;
}

export interface ILiteralSchema { 
    literal: string;
    naturalValue: string;
    modified: boolean;
    modifiedValue: string;
    locked: boolean;
    deleted: boolean;
}

export interface IClauseSchema { 
    literals: ILiteralSchema[];
    locked: boolean;
    deleted: boolean;
}

export interface IStatisticsSchema { 
    total: number;
    unlabeled: number;
    manual: number;
    autoLabeled: number;
}

export interface IRuleSchema { 
    name: string;
    clauses: IClauseSchema[];
    locked: boolean;
    deleted: boolean;
}

export interface IRestrictionSchema { 
    deleted: any;
    locked: any;
}

export interface IImageCollectionSchema { 
    name: string;
    method: "Classification" | "Segmentation";
    images: IImageMetaDataSchema[];
    statistics: IStatisticsSchema;
    rules: IRuleSchema[];
    restrictions: IRestrictionSchema;
    objectList: string[];
}

export interface IWorkspaceSchema { 
    name: string;
    collections: IImageCollectionSchema[];
}

export declare const ImageMetaDataSchema: Schema<IImageMetaDataSchema>;
export declare const LiteralSchema: Schema<ILiteralSchema>;
export declare const ClauseSchema: Schema<IClauseSchema>;
export declare const ImageLabelSchema: Schema<IImageLabelSchema>;
export declare const StatisticsSchema: Schema<IStatisticsSchema>;
export declare const ImageCollectionSchema: Schema<IImageCollectionSchema>;
export declare const WorkspaceSchema: Schema<IWorkspaceSchema>;
export declare const RuleSchema: Schema<IRuleSchema>;
export declare const RestrictionSchema: Schema<IRestrictionSchema>;

export declare const Workspace: Model<IWorkspaceSchema & Document>;