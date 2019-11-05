<template>
<div class="demo">
    <video id="video"
        class="video-js"
        x5-playsinline
        x-webkit-airplay
        webkit-playsinline
        playsinline>
    </video>

    <button @click="handleInitMp4">初始化.mp4音频</button>
    <button @click="handleInitM3u8">初始化.m3u8音频</button>
    <button @click="handleInit">初始化播放进度&速度&封面</button>
    <button @click="handleAutoplay">自动播放</button>
    <button @click="handleAsync">异步设置音频地址</button>
    <button @click="handleSetTime">设置进度30s</button>
    <button @click="handleReload">reload</button>
    <button @click="player.play()">play</button>
    <button @click="player.videoPlayer.currentTime(10)">跳转到4s</button>
</div>
</template>

<script>
import Player from '../index'

export default {
    data () {
        return {
            player: null,
        }
    },

    mounted () {
        this.player = new Player('video')
    },

    methods: {
        handleInitMp4 () {
            this.player.setup([
                {
                    src: 'http://jhsy-img.caizhu.com/video1.mp4',
                    type: 'video/mp4',
                }
            ])
        },
        handleInitM3u8 () {
            this.player.setup([
                {
                    src: 'http://jhsy-img.caizhu.com/lv10CqB9TUpWlK0pEPpCXexK05qL.m3u8?query=hello',
                    type: 'application/x-mpegURL',
                }
            ])
        },
        handleInit () {
            // this.player.setup([
            //     {
            //         src: 'http://jhsy-img.caizhu.com/lv10CqB9TUpWlK0pEPpCXexK05qL.m3u8',
            //         type: 'application/x-mpegURL',
            //     }
            // ])
            this.player.setup([
                {
                    src: 'http://jhsy-img.caizhu.com/video1.mp4',
                    type: 'video/mp4',
                }
            ], {
                currentTime: 20,
                playbackRate: 2,
                poster: 'http://jhsy-img.caizhu.com/jhsy/anniversary/videos/poster-company.png',
            })
        },
        handleAutoplay () {
            this.player = new Player('video', {
                autoplay: true
            })
            this.player.setup([
                {
                    src: 'http://jhsy-img.caizhu.com/video1.mp4',
                    type: 'video/mp4',
                }
            ])
        },
        handleAsync () {
            this.player.setup([
                {
                    src: 'http://jhsy-img.caizhu.com/video1.mp4',
                    type: 'video/mp4',
                }
                // {
                //     src: 'http://jhsy-img.caizhu.com/lv10CqB9TUpWlK0pEPpCXexK05qL.m3u8?query=hello',
                //     type: 'application/x-mpegURL',
                // }
            ], {
                poster: 'http://jhsy-img.caizhu.com/jhsy/anniversary/videos/poster-blessing.png',
                currentTime: 20,
            })
        },
        handleSetTime () {
            this.player.setup([
                {
                    src: 'http://jhsy-img.caizhu.com/video1.mp4',
                    type: 'video/mp4',
                }
            ])
            setTimeout(() => {
                this.player.videoPlay.currentTime(30)
            }, 3000)
        },
        handleReload () {
            this.player.setup([
                {
                    src: 'http://jhsy-img.caizhu.com/video1.mp4',
                    type: 'video/mp4',
                }
            ])
            setTimeout(() => {
                this.player.reload()
            }, 5000)
        },
    },
}
</script>
