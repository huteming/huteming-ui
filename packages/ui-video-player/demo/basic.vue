<template>
<div class="demo">
    <TmVideo
        :sources="sources" ref="video"
        @error-prev="handleToast('没有上一个的提示')" @error-next="handleToast('没有下一个的提示')"
        @ended="handleToast('播放结束')"
        :continuous="false"
        :autoplay="false"
        @click="handleReady"
        @error="handleReady"
        @timeupdate="handleTimeupdate" />

    <TmWhiteSpace />

    <!-- <TmVideo :sources="sources" height="200" ref="video" />

    <TmWhiteSpace />

    <TmVideo :sources="sources" height="1000" ref="video" />

    <TmWhiteSpace />

    <TmVideo :sources="sources" height="310" ref="video" /> -->

    <!-- <tm-divider></tm-divider>

    <div class="videos2">
        <TmVideo :src="mapVideo.get(active).src" :cover="mapVideo.get(active).poster" ref="video" />
    </div>

    <tm-divider></tm-divider>

    <div class="videos3">
        <TmVideo :src="mapVideo.get(active).src" :cover="mapVideo.get(active).poster" ref="video" />
    </div> -->

    <!-- <button @click="handleExchange">exchange</button> -->
</div>
</template>

<script>
import TmVideo from '../index'
import posterVideo from './poster-video.png'

export default {
    data () {
        return {
            sourcesSync: [
                // {
                //     src: 'http://jhsy-img.caizhu.com',
                //     cover: 'http://jhsy-img.caizhu.com/jhsy/anniversary/videos/poster-company.png',
                // },
                {
                    src: 'http://jhsy-img.caizhu.com/lv10CqB9TUpWlK0pEPpCXexK05qL.m3u8?helloworld',
                    cover: posterVideo,
                    currentTime: 5,
                },
                {
                    src: 'http://jhsy-img.caizhu.com/video1.mp4',
                    cover: 'http://jhsy-img.caizhu.com/jhsy/anniversary/videos/poster-company.png',
                    currentTime: 10,
                },
                {
                    src: 'http://jhsy-img.caizhu.com/video2.mp4',
                    cover: 'http://jhsy-img.caizhu.com/jhsy/anniversary/videos/poster-blessing.png',
                },
            ],
            sources: [],
            currentPlay: false,
        }
    },

    mounted () {
        setTimeout(() => {
            this.sources = this.sourcesSync
        }, 1000)
    },

    methods: {
        handleReady () {
            console.log(...arguments)
        },
        handleToast (msg) {
            this.$toast(msg)
        },
        handleTimeupdate (currentTime) {
            console.log('timeupdate', currentTime)
        },
    },

    components: {
        TmVideo,
    },
}
</script>

<style lang="scss" scoped>
.videos1 {
    height: 2rem;
}

.videos2 {
    height: 10rem;
}

.videos3 {
    height: 3.1rem;
}
</style>
