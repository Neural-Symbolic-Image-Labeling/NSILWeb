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
    task: "auto" | "trail";
}

export interface SaveLabelStatusRequest { 
    collectionId: string;
    imageId: string;
    labelData: any;
}

export interface UpdateRulesRequest { 
    collectionId: string;
    rules: any;
}

export interface UpdateLabelsRequest { 
    collectionId: string;
    imageIndex: number;
    label: any;
}