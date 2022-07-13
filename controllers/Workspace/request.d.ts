export interface LoginRequest {
    workspaceName: string;
}

export interface NewCollectionRequest { 
    setName: string;
    workspaceId: string;
}

export interface AutoLabelRequest {
    workspaceId: string;
    collectionId: string;
}

export interface SaveLabelStatusRequest { 
    collectionId: string;
    imageId: string;
    labelData: any;
}