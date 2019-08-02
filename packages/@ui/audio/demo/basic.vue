<template>
<div class="basic">
    <TmAudio
        :src="src"
        v-model="currentTime"
        @waiting="handleWaiting"
        @playing="handlePlaying"
        @pause="handlePause"
        @ended="handleEnded"
        @progress="handleProgress"
        @durationchange="handleDurationchange"
        :preload="true"
        autoplay
        ref="audio" />
    <!-- <TmAudio
        :src="src"
        @timeupdate="handleTimeUpdate" ref="audio" /> -->
    <button @click="play">play</button>
    <button @click="$refs.audio.pause()">pause</button>
    <button @click="$refs.audio.toggle()">toggle</button>
    <p>currentTime: {{ currentTime }}</p>
    <p>duration: {{ duration }}</p>
    <p>progress: {{ progress }}</p>
    <button @click="handleChange">change src</button>
</div>
</template>

<script>
import TmAudio from '../index'

export default {
    data () {
        return {
            currentTime: 10,
            progress: 0,
            src: '',
            duration: 849,

            src1: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y?d=0320',
            src2: 'http://jhsy-img.caizhu.com/Fiw-_Pvh52t0LFNpjXKIsJ8XzUrz?d=0320',
        }
    },

    mounted () {
        this.src = this.src1
    },

    methods: {
        handleChange () {
            this.src = this.src === this.src1 ? this.src2 : this.src1
            this.currentTime = 0
        },
        play () {
            // this.currentTime = 845
            // this.$refs.audio.play()
            this.$refs.audio.play(845)
        },
        handleWaiting () {
            console.log('waiting')
        },
        handlePlaying () {
            console.log('playing')
        },
        handlePause () {
            console.log('pause')
        },
        handleEnded () {
            console.log('ended')
        },
        handleProgress (_progress) {
            this.progress = _progress
        },
        handleDurationchange (_duration) {
            this.duration = _duration
        },
    },

    components: {
        TmAudio,
    },
}
</script>
