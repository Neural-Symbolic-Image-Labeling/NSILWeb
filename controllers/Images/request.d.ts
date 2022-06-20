export interface ImageUploadRequest { 
    name: string;
    data: Buffer;
}

export interface AuthRequest { 
    token: string;
}