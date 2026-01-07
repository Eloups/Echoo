export type BaseInfos = {
    cover: any,
    title: string,
    artist: string[] | string,
    color1: string,
    color2: string,
    nbStreams?: number,
    type: string,
    musicList?: BaseInfos[],
    nbMusics?: number,
    description?: string,
    id?: number,
    audioFile?: string, // Nom du fichier audio pour le streaming
    duration?: number, // Durée en secondes depuis le backend
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
    id : number,
    name: string,
    isVerified: boolean,
    description?: string,
    image_path?: string,
    nb_likes: Int16Array,
    popular_musics: APIMusic[],
    last_releases : APIMusic[] 
}