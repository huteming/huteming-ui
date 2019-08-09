<template>
<div class="tm-notice-bar">
    <TmIcon class="tm-notice-bar-icon" :icon="icon" v-if="icon" />

    <div class="tm-notice-bar-content" ref="content">
        <div class="tm-notice-bar-wrap" :style="styleWrap" ref="wrap">
            <slot></slot>
        </div>
    </div>

    <div class="tm-notice-bar-action" @click="handleClick" v-if="mode || $slots.action">
        <slot name="action">
            <TmIcon :icon="actionIcon" />
        </slot>
    </div>
</div>
</template>

<script>
import TmIcon from 'web-ui/icon/src/index'
import { linear } from 'web-util/animation/src/main'
const TIME_DELAY = 2000
const TIME_RESTORE = 1000
const PX_TIME_CONSUMING = 25 // 移动每像素耗时，毫秒
const EXTRA_DISTANCE = 15 // 额外移动的距离

export default {
    name: 'TmNoticeBar',

    props: {
        mode: {
            type: String,
        },
        icon: {
            type: String,
            default: 'volume_up',
        },
        duration: {
            type: [Number, String],
            validator (val) {
                return !isNaN(Number(val))
            },
        },
        loop: {
            type: Boolean,
            default: true,
        },
    },

    data () {
        return {
            moveLeft: 0,
        }
    },

    computed: {
        actionIcon () {
            switch (this.mode) {
            case 'closeable':
                return 'clear'
            case 'link':
                return 'arrow_forward'
            default:
                return this.mode
            }
        },
        styleWrap () {
            return {
                transform: `translateX(-${this.moveLeft}px)`,
            }
        },
    },

    mounted () {
        this.start()
    },

    beforeDestroy () {
        clearTimeout(this.timerMove)
        clearTimeout(this.timerRestore)
    },

    methods: {
        handleClick () {
            this.$emit('click')

            if (this.mode === 'closeable') {
                this.destroyElement()
            }
        },
        start () {
            const widthContent = this.$refs.content.offsetWidth
            const widthWrap = this.$refs.wrap.offsetWidth
            const diff = widthWrap - widthContent
            if (diff > 0) {
                const distance = diff + EXTRA_DISTANCE
                const duration = this.duration || distance * PX_TIME_CONSUMING
                this.move(distance, duration)
            }
        },
        move (distance, duration) {
            this.timerMove = setTimeout(() => {
                linear(0, distance, (position, isFinish) => {
                    this.moveLeft = position

                    if (isFinish) {
                        this.restore()

                        if (this.loop) {
                            this.move(distance, duration)
                        }
                    }
                }, duration)
            }, TIME_DELAY)
        },
        restore () {
            this.timerRestore = setTimeout(() => {
                this.moveLeft = 0
            }, TIME_RESTORE)
        },
        destroyElement () {
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
        },
    },

    components: {
        TmIcon,
    },
}
</script>
