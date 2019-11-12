<template>
<div class="basic">
    <TmAudio
        ref="player"
        v-model="currentTime"
        :play.sync="statePlay"
        :src="src3"
        :playback-rate="playbackRate"
        @ready="handleReady"
        @play="handlePlay"
        @firstplay="handleFirstplay"
        @pause="handlePause"
        @ended="handleEnded"
        @timeupdate="handleUpdate" />

    <button @click="statePlay = true" style="width: 100px; height: 20px;">play</button>
    <button @click="statePlay = false">pause</button>
    <p>currentTime: {{ currentTime }}</p>
    <p>duration: {{ duration }}</p>
    <p>progress: {{ progress }}</p>
    <p>statePlay: {{ statePlay }}</p>
    <button @click="handleChange">change src</button>
    <button @click="currentTime = 1000">change currentTime</button>
    <button @click="playbackRate = 1.5">change rate</button>
    <button @click="handleReload">reload</button>
    <button @click="mockPlayer">mock player</button>
</div>
</template>

<script>
import TmAudio from '../src/app'

export default {
    data () {
        return {
            src: '',
            statePlay: false,
            currentTime: 0,
            progress: 0,
            duration: 849,
            playbackRate: 1,

            src1: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y?d=0320',
            src2: 'http://jhsy-img.caizhu.com/Fiw-_Pvh52t0LFNpjXKIsJ8XzUrz?d=0320',
            src3: 'http://jhsy-img.caizhu.com/lvisA64GE9I1anin2a3DPeab9Uza.m3u8?hello',
        }
    },

    mounted () {
        // setTimeout(() => {
        //     this.src = this.src1
        // }, 2000)
    },

    methods: {
        async mockPlayer () {
            this.src = this.src3
            this.currentTime = 30
            // await this.$nextTick()
        },
        handleReady (...args) {
            // console.log('ready', ...args)
        },
        handleChange () {
            // this.src = this.src === this.src1 ? this.src3 : this.src1
            this.src = this.src3
        },
        handleProgress (_progress) {
            this.progress = _progress
        },
        handleReload () {
            this.$refs.player.reload()
        },
        handleDurationchange (_duration) {
            this.duration = _duration
        },
        handleEnded () {
            console.log('ended', ...arguments)
        },
        handleFirstplay () {
            console.log('first play', ...arguments)
        },
        handlePlay () {
            console.log('play', ...arguments)
        },
        handlePause () {
            console.log('pause', ...arguments)
        },
        handleUpdate () {
            console.log('timeupdate', ...arguments)
        },
    },

    components: {
        TmAudio,
    },
}
</script>
