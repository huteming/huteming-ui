<template>
<div class="demo">
    <div class="videos1">
        <TmVideo :src="video" :cover="cover" ref="video" @ready="handleReady" />
    </div>

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
                {
                    src: 'http://jhsy-img.caizhu.com/video1.mp4',
                    cover: 'http://jhsy-img.caizhu.com/jhsy/anniversary/videos/poster-company.png',
                },
                {
                    src: 'http://jhsy-img.caizhu.com/video2.mp4',
                    cover: 'http://jhsy-img.caizhu.com/jhsy/anniversary/videos/poster-blessing.png',
                },
                {
                    src: 'http://jhsy-img.caizhu.com/lv10CqB9TUpWlK0pEPpCXexK05qL.m3u8',
                    cover: posterVideo,
                },
            ],
            video: 'http://jhsy-img.caizhu.com/lv10CqB9TUpWlK0pEPpCXexK05qL.m3u8',
            cover: posterVideo,
            active: 'company',
        }
    },

    methods: {
        handleExchange () {
            this.active = this.active === 'company' ? 'blessing' : 'company'
        },
        handleReady () {
            console.log(...arguments)
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
