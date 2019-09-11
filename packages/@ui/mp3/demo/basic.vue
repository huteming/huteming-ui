<template>
<div class="demo">
    <div class="cover">
        <div class="cover-wrap">
            <img src="./images/cover.png" alt="" ref="cover">
        </div>
    </div>

    <div class="audio">
        <TmMp3
            ref="mp3"
            :list="lists"
            :play.sync="currentPlay"
            color="rgba(255, 0, 78, 1)"
            :continuous="continuous"
            @change="handleChange"
            @init="handleInit"
            @ended="handleEnd"
            @error-prev="handleToast('没有上一个的提示')"
            @error-next="handleToast('没有下一个的提示')"
            @error="handleError" />

        <div class="audio-footer">
            <div class="audio-current">{{ currentTime | time }}</div>
            <div class="audio-duration">{{ duration | time }}</div>
        </div>
    </div>

    <div class="controller">
        <div class="controller-item controller-white" @click="handleRate">
            <span>{{ playRate }}X</span>
        </div>
        <div class="controller-item controller-blue" @click="$refs.mp3.prev()">
            <TmIcon icon="skip_previous" />
        </div>
        <div class="controller-item controller-blue" @click="currentPlay = !currentPlay">
            <TmIcon :icon="currentPlay ? 'pause' : 'play'" />
        </div>
        <div class="controller-item controller-blue" @click="$refs.mp3.next()">
            <TmIcon icon="skip_next" />
        </div>
        <div class="controller-item controller-white">
            <TmIcon icon="playlist_play" />
        </div>
    </div>
</div>
</template>

<script>
import TmMp3 from '../index'
import Loading from 'web-ui/loading/index'

export default {
    data () {
        return {
            asyncLists: [
                {
                    duration: 852,
                    src: 'http://jhsy-img.caizhu.com/lvisA64GE9I1anin2a3DPeab9Uza.m3u8',
                },
                {
                    duration: 16.728,
                    src: 'http://jhsy-img.caizhu.com/Fiw-_Pvh52t0LFNpjXKIsJ8XzUrz?d=2',
                },
                {
                    duration: 852,
                    src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y?d=3',
                },
                {
                    duration: 16.728,
                    src: 'http://jhsy-img.caizhu.com/Fiw-_Pvh52t0LFNpjXKIsJ8XzUrz?d=4',
                },
            ],
            lists: [],
            currentPlay: true,

            duration: 0,
            currentTime: 0,
            playRate: 1,
            rotateDeg: 0,

            ready: false,
            continuous: false,
        }
    },

    computed: {
    },

    watch: {
        currentPlay: {
            handler (val) {
                val ? this.startRotate() : this.endRotate()
            },
            immediate: true,
        },
    },

    mounted () {
        setTimeout(() => {
            this.lists = this.asyncLists
        }, 1500)
    },

    methods: {
        handleError (err) {
            console.error(err)
        },
        handleToast (msg) {
            this.$toast(msg)
        },
        handleChange (_currentTime) {
            this.currentTime = _currentTime
        },
        handleEnd () {
            console.log('end')
        },
        handleInit ({ duration, currentTime }) {
            console.log('init', currentTime)
            this.duration = duration
            this.currentTime = currentTime

            this.ready = true
        },
        handleRate () {
            this.playRate = this.$refs.mp3.setRate()
            // this.$refs.mp3.reload()
        },
        startRotate () {
            const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

            const rotate = () => {
                this.$refs.cover.style.transform = `rotate(${this.rotateDeg++}deg)`
                this.timer = requestAnimationFrame(rotate)
            }
            this.timer = requestAnimationFrame(rotate)
        },
        endRotate () {
            const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame

            cancelAnimationFrame(this.timer)
        },
    },

    filters: {
        time (val) {
            if (typeof val !== 'number') {
                return '--:--'
            }
            let minutes = parseInt(val / 60)
            let seconds = Math.floor((val % 60))

            function fix (value) {
                return value <= 9 ? `0${value}` : value.toString()
            }

            return `${fix(minutes)}:${fix(seconds)}`
        },
    },

    components: {
        TmMp3,
    },

    directives: {
        Loading,
    },
}
</script>

<style lang="scss" scoped>
.demo {
    padding-top: 30px;
}

.controller {
    width: 7.5rem;
    padding: .5rem .28rem .94rem .28rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: .76rem .76rem 0 0;
    background: linear-gradient(144deg,rgba(232,239,255,1) 0%,rgba(210,222,255,1) 100%);
    overflow: hidden;
    box-sizing: border-box;

    &-item {
        width: .76rem;
        height: .76rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .36rem;
        line-height: 1.2;
        border-radius: .3rem;
    }

    &-white {
        color: rgba(59, 157, 249, 1);
        background: #fff;
    }

    &-blue {
        color: #fff;
        background: linear-gradient(180deg,rgba(59,166,248,1) 0%,rgba(58,138,252,1) 100%);
    }
}

.audio {
    width: 5.98rem;
    margin: 0 auto .4rem;

    &-footer {
        margin-top: .1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &-current {
        font-size: .24rem;
        line-height: .28rem;
        color: rgba(38, 38, 40, 1);
    }

    &-duration {
        font-size: .24rem;
        line-height: .28rem;
        color: rgba(163, 163, 164, 1);
    }
}

.cover {
    width: 5.6rem;
    margin: 0 auto .5rem;
    border: 1px solid rgba(151, 151, 151, .2);
    border-radius: 50%;
    overflow: hidden;

    &-wrap {
        padding: .34rem;
        border-radius: 50%;
        box-sizing: border-box;
        overflow: hidden;
    }

    img {
        display: block;
        width: 100%;
        transform: rotate(0deg);
    }
}

.animate {
    transition: 1s linear;
}
</style>
