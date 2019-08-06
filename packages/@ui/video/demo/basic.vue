<template>
<div class="videos-company">
    <TmVideo :src="mapVideo.get(active).src" :cover="mapVideo.get(active).poster" ref="video" />

    <button @click="handleExchange">exchange</button>
    <button @click="handleToggle">toggle</button>
</div>
</template>

<script>
import TmVideo from '../index'
import video1 from './video1.mp4'
import video2 from './video2.mp4'

const mapVideo = new Map([
    [
        'company',
        {
            src: video1,
            poster: 'http://jhsy-img.caizhu.com/jhsy/anniversary/videos/poster-company.png',
        }
    ],
    [
        'blessing',
        {
            src: video2,
            poster: 'http://jhsy-img.caizhu.com/jhsy/anniversary/videos/poster-blessing.png',
        }
    ]
])

export default {
    data () {
        return {
            mapVideo,
            active: 'company',
        }
    },

    methods: {
        handleExchange () {
            this.active = this.active === 'company' ? 'blessing' : 'company'
        },
        handleToggle () {
            this.$refs.video.toggle()
        },
    },

    components: {
        TmVideo,
    },
}
</script>

<style lang="scss" scoped>
.videos-company {
    width: 6.18rem;
    height: 3.48rem;
    margin: 0 auto;
}
</style>
