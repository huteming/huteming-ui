import videojs, { VideoJsPlayer } from 'video.js'

export interface IPlayer {
    videojs: typeof videojs
    videoPlayer: VideoJsPlayer
    on (event: string, fn: Function): void
    off (event: string, fn: Function): void
    play (): void
    pause (): void
    reload (): void
    next (): boolean
    prev (): boolean
}

export interface IEvents {
    [propName: string]: Function[]
}

export type IEvent = 'ready' | 'timeupdate'

export interface InitOptions {
    currentTime?: number
    playbackRate?: number
    poster?: string
}
