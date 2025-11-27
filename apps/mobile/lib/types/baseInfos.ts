export type BaseInfos = {
    cover: any,
    title: string,
    artist: string[] | string,
    color1: string,
    color2: string,
    nbStreams?: number,
    type: string,
    musicList?: BaseInfos[],
    nbMusics?: number
}