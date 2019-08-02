<template>
<div class="demo">
    <div class="cover">
        <div class="cover-wrap">
            <img src="./images/cover.png" alt="" ref="cover">
        </div>
    </div>

    <div class="audio">
        <TmMp3
            v-model="currentTime"
            :src="current.src"
            :duration="current.duration"
            ref="mp3"
            autoplay
            color="rgba(255, 0, 78, 1)"
            @state-change="handleStateChange" />

        <div class="audio-footer">
            <div class="audio-current">{{ currentTime | time }}</div>
            <div class="audio-duration">{{ current.duration | time }}</div>
        </div>
    </div>

    <div class="controller">
        <div class="controller-item controller-white" @click="handleRate">
            <span>{{ playRates[playRatesIndex] }}X</span>
        </div>
        <div class="controller-item controller-blue" @click="handlePrev">
            <TmIcon icon="skip_previous" />
        </div>
        <div class="controller-item controller-blue" @click="handleToggle">
            <TmIcon :icon="mediaState === 'playing' ? 'pause' : 'play'" />
        </div>
        <div class="controller-item controller-blue" @click="handleNext">
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

export default {
    data () {
        return {
            asyncLists: [
                {
                    duration: 852,
                    src: 'http://jhsy-img.caizhu.com/lh8gwVTFUoXlN267Evt6pedsIg6y?d=0320',
                },
                {
                    duration: 16.728,
                    src: 'http://jhsy-img.caizhu.com/Fiw-_Pvh52t0LFNpjXKIsJ8XzUrz?d=0320',
                },
            ],
            lists: [],
            activeIndex: 0,
            currentTime: 0,

            media: null,
            mediaState: '',
            rotateDeg: 0,
            playRates: [0.5, 1.0, 2.0],
            playRatesIndex: 1,
        }
    },

    computed: {
        current () {
            return this.lists[this.activeIndex] || {}
        },
        styleCover () {
            return {
                transform: `rotate(${this.currentTime * 36}deg)`,
            }
        },
    },

    mounted () {
        this.media = this.$refs.mp3

        setTimeout(() => {
            this.lists = this.asyncLists
        }, 2000)
    },

    methods: {
        handleRate () {
            const index = this.playRatesIndex >= this.playRates.length - 1 ? 0 : this.playRatesIndex + 1
            this.playRatesIndex = index
            this.media && (this.media.setValue('playbackRate', this.playRates[index]))
        },
        handlePrev () {
            if (this.activeIndex <= 0) return
            this.activeIndex--
            this.currentTime = 0
        },
        handleNext () {
            if (this.activeIndex >= this.lists.length - 1) return
            this.activeIndex++
            this.currentTime = 0
        },
        handleToggle () {
            this.media && this.media.exec('toggle')
        },
        handleStateChange (state) {
            this.mediaState = state
            state === 'playing' && this.startRotate()
        },
        startRotate () {
            const cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
            const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

            cancelAnimationFrame(this.timer)

            const rotate = () => {
                if (this.mediaState !== 'playing') return

                this.$refs.cover.style.transform = `rotate(${this.rotateDeg++}deg)`
                this.timer = requestAnimationFrame(rotate)
            }
            this.timer = requestAnimationFrame(rotate)
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
