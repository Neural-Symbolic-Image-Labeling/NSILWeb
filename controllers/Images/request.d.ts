export interface ImageUploadRequest { 
    name: string;
    data: string;
    imageSetName: string;
}

export interface AuthRequest { 
    token: string;
}

export interface CreateNewSetRequest { 
    name: string;
}