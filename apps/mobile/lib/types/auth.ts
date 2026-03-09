
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

export interface GetUserPayload {
    id: string;
    username: string;
    email: string;
    password: string | null;
    imagePath: string | null;
    library: {
        id: string;
        authors: any[];
        playlists: any[];
        projects: any[];
    };
    userRole: {
        id: number;
        name: string;
    };
    artist: any | null;
    friends: any[];
    conversations: any[];
    rates: any | null;
}


export interface VerifyAuthResponse {
    status: 'SUCCESS' | 'ERROR';
    decoded?: JWTPayload;
    message?: string;
    code?: string;
}

export class User {
    id: string;
    username: string;
    email: string;
    image: string | null;
    expirationTime?: number;
    password?: string | null;
    imagePath?: string | null;
    library?: {
        id: string;
        authors: any[];
        playlists: any[];
        projects: any[];
    };
    userRole?: {
        id: number;
        name: string;
    };
    artist?: any | null;
    friends?: any[];
    conversations?: any[];
    rates?: any | null;

    // Surcharges de constructeur 
    // (les deux lignes ci-dessous serve a l'autocomplétion mais à l'exécution seul le constructeur avec "any" est utilisé)
    constructor(payload: GetUserPayload);
    constructor(payload: Partial<Pick<JWTPayload, 'id' | 'email' | 'name' | 'image' | 'exp'>>);
    constructor(payload: any) {
        this.id = payload?.id ?? '';
        this.username = payload?.username ?? payload?.name ?? '';
        this.email = payload?.email ?? '';
        this.password = payload?.password ?? null;
        this.imagePath = payload?.imagePath ?? null;
        this.library = payload?.library ?? undefined;
        this.userRole = payload?.userRole ?? undefined;
        this.artist = payload?.artist ?? null;
        this.friends = payload?.friends ?? undefined;
        this.conversations = payload?.conversations ?? undefined;
        this.rates = payload?.rates ?? null;
        this.image = payload?.imagePath ?? payload?.image ?? null;
        this.expirationTime = payload?.expirationTime ?? payload?.exp ?? undefined;
    }

    static fromJWTPayload(payload: JWTPayload): User {
        return new User({
            id: payload.id,
            email: payload.email,
            name: payload.name,
            image: payload.image,
            exp: payload.exp
        });
    }
}

