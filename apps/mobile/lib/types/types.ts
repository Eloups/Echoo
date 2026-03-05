export type Music = {
    id: number,
    cover: any,
    title: string,
    artist: string[] | string,
    color1: string,
    color2: string,
    nbStreams?: number,
    audioFile?: string,
    duration?: number,
    nameArtist?: string,
    filePath?: string,
    rates?: any[],
}

export type Playlist = {
    id?: number,
    cover: any,
    title: string,
    description: string,
    musics?: Music[],
    nbMusics: number,
}

export type Project = {
    cover: any,
    type: string,
    title: string,
    description: string,
    artist: string[] | string,
    musics?: Music[],
}

export type Artist = {
    id?: number,
    cover: any,
    title: string,
    name?: string,
    isVerified?: boolean,
    description?: string,
    nb_likes?: number,
    popular_musics?: Music[],
    last_releases?: Music[]
}

type APIMusic = {
    id: number,
    title: string,
    duration: number,
    release: string,
    nb_streams: number,
    file_path: string,
    music_genres: string[]
}

export type APIArtist = {
    id: number,
    name: string,
    isVerified: boolean,
    description?: string,
    image_path?: string,
    nb_likes: number,
    popular_musics: APIMusic[],
    last_releases: APIMusic[]
}