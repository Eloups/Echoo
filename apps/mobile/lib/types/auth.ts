
export interface JWTPayload {
    aud: string;
    createdAt: string;
    email: string;
    emailVerified: boolean;
    exp: number;
    iat: number;
    id: string;
    image: string | null;
    iss: string;
    name: string;
    sub: string;
    updatedAt: string;
}

export interface VerifyAuthResponse {
    status: 'SUCCESS' | 'ERROR';
    decoded?: JWTPayload;
    message?: string;
    code?: string;
}

export class User {
    id: string;
    email: string;
    name: string;
    image: string | null;

    constructor(id: string, email: string, name: string, image: string | null = null) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.image = image;
    }

    static fromJWTPayload(payload: JWTPayload): User {
        return new User(payload.id, payload.email, payload.name, payload.image);
    }
}

