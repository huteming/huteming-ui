<template>
<section class="t-range" @touchstart="handleTouchstart" @touchmove="handleTouchmove" @touchend="handleTouchend">
    <div class="t-range-start" v-if="$slots.start">
        <slot name="start"></slot>
    </div>

    <div class="t-range-min" v-if="showValue">{{ min }}</div>

    <div class="t-range-content" :class="{ 'disabled': disabled }" ref="content">
        <div class="t-range-progress" :style="styleProgress"></div>

        <div class="t-range-finger" ref="thumb">
            <div class="t-range-finger-thumb" :style="styleThumb"></div>
        </div>

        <div class="t-range-runway" :style="styleRunWay"></div>
    </div>

    <div class="t-range-max" v-if="showValue">{{ max }}</div>

    <div class="t-range-end" v-if="$slots.end">
        <slot name="end"></slot>
    </div>
</section>
</template>

<script>
export default {
    name: 'TmRange',

    props: {
        value: {
            type: Number,
            default: 0,
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        showValue: {
            type: Boolean,
            default: false
        },
        barHeight: {
            type: Number,
            default: 4,
        },
        disabled: {
            type: Boolean,
            default: false
        },
        color: String,
    },

    data () {
        return {
            startX: 0,
            startY: 0,
            startValue: 0,
            widthProgress: 0,
            normalizedValue: this.value,

            direction: '',
        }
    },

    computed: {
        rate () {
            return (this.normalizedValue - this.min) / (this.max - this.min)
        },
        stepCount () {
            return Math.ceil((this.max - this.min) / this.step)
        },
        styleProgress () {
            return {
                height: `${this.barHeight}px`,
                width: `${this.rate * this.widthProgress}px`,
                background: this.color,
            }
        },
        styleRunWay () {
            return {
                height: `${this.barHeight}px`,
            }
        },
        styleThumb () {
            return {
                background: this.color,
            }
        },
    },

    watch: {
        value (val) {
            this.normalizedValue = val
        },
        normalizedValue (val) {
            this.$emit('input', val)
        },
    },

    mounted () {
        this.widthProgress = this.$refs.content.offsetWidth - this.$refs.thumb.offsetWidth
    },

    methods: {
        handleTouchstart (event) {
            if (this.disabled) return

            const finger = event.changedTouches[0]

            this.startX = finger.pageX
            this.startY = finger.pageY
            this.startValue = this.normalizedValue

            this.$emit('moving', true)
        },
        handleTouchmove (event) {
            if (this.disabled) return

            const finger = event.changedTouches[0]
            const moveX = finger.pageX - this.startX
            const moveY = finger.pageY - this.startY

            // 未处理滑动方向
            if (this.direction === '') {
                // 滑动幅度太小，不处理
                if (Math.abs(moveX) < 4 && Math.abs(moveY) < 4) {
                    return
                }

                if (Math.abs(moveY) > 4) {
                    this.direction = 'vertical'
                } else {
                    this.direction = 'across'
                }
            }

            // 滑动方向与配置方向不一致
            if (this.direction === 'vertical') {
                return
            }
            event.preventDefault()

            const stepMove = Math.round(moveX / (this.widthProgress / this.stepCount))
            let newValue = stepMove * this.step + this.startValue

            if (newValue < this.min) {
                newValue = this.min
            } else if (newValue > this.max) {
                newValue = this.max
            }

            this.normalizedValue = newValue
        },
        handleTouchend (event) {
            if (this.disabled) return

            this.$emit('moving', false)
            this.$emit('change', this.normalizedValue)
        }
    }
}
</script>

<style lang="scss" scoped>
@import './style/index.scss';
</style>
