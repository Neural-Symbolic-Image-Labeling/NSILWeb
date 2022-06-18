export interface ImageUploadRequest { 
    name: string;
    extension: string;
    data: Buffer;
}

export interface AuthRequest { 
    token: string;
}