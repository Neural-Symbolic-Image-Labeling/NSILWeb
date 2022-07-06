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