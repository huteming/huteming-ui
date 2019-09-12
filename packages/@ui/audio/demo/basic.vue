<template>
<div class="basic">
    <TmAudio
        ref="player"
        v-model="currentTime"
        :play.sync="statePlay"
        :src="src"
        @ready="handleReady"
        @play="handleLog"
        @pause="handleLog"
        @ended="handleEnded" />

    <button @click="statePlay = true" style="width: 100px; height: 20px;">play</button>
    <button @click="statePlay = false">pause</button>
    <p>currentTime: {{ currentTime }}</p>
    <p>duration: {{ duration }}</p>
    <p>progress: {{ progress }}</p>
    <p>statePlay: {{ statePlay }}</p>
    <button @click="handleChange">change src</button>
    <button @click="currentTime = 1000">change currentTime</button>
</div>
</template>

<script>
import TmAudio from '../src/app'

export default {
    data () {
        return {
            statePlay: false,
            currentTime: 10,
            progress: 0,
            src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y?d=0320',
            duration: 849,

            src1: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y?d=0320',
            src2: 'http://jhsy-img.caizhu.com/Fiw-_Pvh52t0LFNpjXKIsJ8XzUrz?d=0320',
        }
    },

    mounted () {
        // setTimeout(() => {
        //     this.src = this.src1
        // }, 2000)
    },

    methods: {
        handleReady (...args) {
            console.log('ready', ...args)
        },
        handleChange () {
            this.src = this.src === this.src1 ? this.src2 : this.src1
        },
        handleProgress (_progress) {
            this.progress = _progress
        },
        handleDurationchange (_duration) {
            this.duration = _duration
        },
        handleEnded () {
            alert('ended')
        },
        handleLog () {
            console.log('log', ...arguments)
        },
    },

    components: {
        TmAudio,
    },
}
</script>
