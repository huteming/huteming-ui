<template>
<div class="demo">
    <div class="container" style="height: 5rem;">
        <TmMp4
            :list="list" :play.sync="play" :continuous="continuous" ref="mp4"
            @error-prev="handleToast('没有上一个的提示')" @error-next="handleToast('没有下一个的提示')"
            @init="handleInit"
            @click="handleLog" />
    </div>

    <button @click="$refs.mp4.next()">next</button>
    <button @click="$refs.mp4.prev()">prev</button>
    <button @click="continuous = !continuous">连续播放：{{ continuous }}</button>
    <button @click="play = !play">toggle: {{ play }}</button>
    <button @click="handleRoute">刷新页面</button>
</div>
</template>

<script>
// import video1 from './video1.mp4'
import video2 from './video2.mp4'
import TmMp4 from '../index'
import posterVideo from './poster-video.png'
import posterVideo2 from './poster-video2.png'

export default {
    data () {
        return {
            asyncList: [
                {
                    // src: '',
                    src: 'http://jhsy-img.caizhu.com/lv10CqB9TUpWlK0pEPpCXexK05qL.m3u8',
                    // src: 'http://jhsy-img.caizhu.com/li7AxWsjYdihZZdvAIi1pdxKYwsf.m3u8',
                    // src: video1,
                    cover: posterVideo,
                },
                {
                    src: video2,
                    cover: posterVideo2,
                },
            ],
            list: [],
            play: false,
            continuous: true,
        }
    },

    mounted () {
        setTimeout(() => {
            this.list = this.asyncList
        }, 1000)

        // setTimeout(() => {
        //     this.list = [
        //         {
        //             src: '',
        //             cover: posterVideo,
        //         },
        //     ]
        // }, 1000)

        // setTimeout(() => {
        //     this.list = [
        //         {
        //             src: '',
        //             cover: posterVideo2,
        //         },
        //     ]
        // }, 1500)

        // setTimeout(() => {
        //     this.list = [
        //         {
        //             src: video2,
        //             cover: posterVideo2,
        //         },
        //     ]
        // }, 2000)
    },

    methods: {
        handleRoute () {
            location.reload()
        },
        handleToast (msg) {
            this.$toast(msg)
        },
        handleInit (data) {
            console.log('init')
            // alert(data.src)
            // alert(data.cover)
        },
        handleLog (...args) {
            console.log('log', ...args)
        },
    },

    components: {
        TmMp4,
    },
}
</script>
