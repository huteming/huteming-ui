<template>
<div class="demo">
    <TmMp4 :list="list" :play.sync="play" :continuous="continuous" ref="mp4"
        @error-prev="handleToast('没有上一个的提示')" @error-next="handleToast('没有下一个的提示')"
        @init="handleInit"
        @click="handleLog" />

    <button @click="$refs.mp4.next()">next</button>
    <button @click="$refs.mp4.prev()">prev</button>
    <button @click="continuous = !continuous">连续播放：{{ continuous }}</button>
</div>
</template>

<script>
import video1 from './video1.mp4'
import video2 from './video2.mp4'
import TmMp4 from '../index'

export default {
    data () {
        return {
            asyncList: [
                {
                    src: video1,
                    cover: '',
                },
                {
                    src: video2,
                    cover: '',
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
    },

    methods: {
        handleToast (msg) {
            this.$toast(msg)
        },
        handleInit () {
            console.log('init')
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
