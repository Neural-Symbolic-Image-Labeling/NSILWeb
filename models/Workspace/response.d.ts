import { IImageMetaDataSchema, IWorkspaceSchema } from ".";

export interface IImageMetaDataResponse extends Omit<IImageMetaDataSchema, "none"> {
}

export interface IWorkspaceResponse extends Omit<IWorkspaceSchema, "images">{
    images: IImageMetaDataResponse[];
}