<template>
<div class="demo">
    <div class="videos1">
        <TmVideo :src="video" :cover="cover" ref="video" @ready="handleReady" />
    </div>

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
import video1 from './video1.mp4'
// import video2 from './video2.mp4'
import posterVideo from './poster-video.png'

const mapVideo = new Map([
    [
        'company',
        {
            src: video1,
            poster: 'http://jhsy-img.caizhu.com/jhsy/anniversary/videos/poster-company.png',
            // poster: '',
        }
    ],
    [
        'blessing',
        {
            src: 'http://jhsy-img.caizhu.com/lv10CqB9TUpWlK0pEPpCXexK05qL.m3u8',
            poster: 'http://jhsy-img.caizhu.com/jhsy/anniversary/videos/poster-blessing.png',
        }
    ]
])

export default {
    data () {
        return {
            video: 'http://jhsy-img.caizhu.com/lv10CqB9TUpWlK0pEPpCXexK05qL.m3u8',
            cover: posterVideo,
            mapVideo,
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
