<template>
<div class="tm-carousel" :style="styles" @touchstart="handleTouchstart" @touchmove="handleTouchmove" @touchend="handleTouchend">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'TmCarousel',

    props: {
        height: {
            type: String,
        },
        initial: {
            type: [Number, String],
            default: 0,
        },
        loop: {
            type: Boolean,
            default: true,
        },
        autoplay: {
            type: Boolean,
            default: false,
        },
        interval: {
            type: Number,
            default: 3000,
        },
        // 走马灯展示的方向
        direction: {
            type: String,
            default: 'horizontal',
            validator (val) {
                return ['horizontal', 'vertical'].indexOf(val) > -1
            },
        },
        disabledTouch: {
            type: Boolean,
            default: false,
        },
    },

    data () {
        return {
            currentIndex: -1,
            // carousel-item 组件
            items: [],
            timer: null,

            // 在 touchstart 时标记是否需要重新启动定时器
            restart: false,
            startX: 0,
            startY: 0,
            move: 0,
            moveDirection: '', // '', vertical, horizontal
            needRespond: false,
        }
    },

    computed: {
        styles () {
            return {
                height: this.height,
            }
        },
    },

    watch: {
        initial (val) {
            if (this.items.length > 0) {
                this.setActiveItem(val)
                this.startTimer()
            }
        },
        autoplay (val) {
            val ? this.startTimer() : this.pauseTimer()
        },
        async items (val) {
            if (val.length > 0) {
                await this.$nextTick()
                this.setActiveItem(this.initial)
                this.startTimer()
            }
        },
        currentIndex (val, oldVal) {
            this.updateItemsPosition(val, oldVal)

            this.$emit('change', val, oldVal)
        },
    },

    mounted () {
        this.updateItems()
    },

    beforeDestroy () {
        this.pauseTimer()
    },

    methods: {
        // 指定活跃item
        setActiveItem (index) {
            if (!this.items.length) {
                return false
            }

            let _index = index

            if (typeof _index === 'string') {
                const filteredItems = this.items.filter(item => item.name === _index)
                if (filteredItems.length > 0) {
                    _index = this.items.indexOf(filteredItems[0])
                }
            }

            _index = Number(_index)
            if (isNaN(_index) || _index !== Math.floor(_index)) {
                console.warn('[@huteming/ui Warn][Carousel]index is invalid: ', index)
                return false
            }

            const total = this.items.length

            if (_index < 0) {
                this.currentIndex = this.loop ? _index + total : 0
            } else if (_index >= total) {
                this.currentIndex = this.loop ? _index % total : total - 1
            } else {
                this.currentIndex = _index
            }

            return true
        },
        // 更新子元素
        updateItems () {
            this.items = this.$children.filter(item => item.$options.name === 'TmCarouselItem')
        },
        // 改变子元素位置
        updateItemsPosition (activeIndex, oldIndex) {
            this.items.forEach((item, index) => {
                item.translateItem(index, activeIndex, oldIndex)
            })
        },
        prev () {
            return this.setActiveItem(this.currentIndex - 1)
        },
        next () {
            return this.setActiveItem(this.currentIndex + 1)
        },
        /**
         * @argument {Boolean} direction true: 回滚到右边/下边; false: 回滚到左边/上边
         */
        moveItemsPosition (activeIndex, move, direction) {
            this.items.forEach((item, index) => item.moveItem(index, activeIndex, move, direction))
        },

        playSlides () {
            const total = this.items.length

            // 提前判断是否还有下一张，没有的话，则停止计时
            if (!this.loop && this.currentIndex === total - 2) {
                this.pauseTimer()
            }

            if (this.currentIndex < total - 1) {
                this.currentIndex++
                return true
            }

            if (this.loop) {
                this.currentIndex = 0
                return true
            }
            return false
        },

        pauseTimer () {
            clearInterval(this.timer)
            this.timer = null
        },

        startTimer () {
            if (this.interval <= 0 || !this.autoplay || this.timer) {
                return false
            }

            this.timer = setInterval(this.playSlides, this.interval)
        },
        // 手势
        handleTouchstart (event) {
            if (this.disabledTouch) {
                return false
            }

            const finger = event.changedTouches[0]
            this.restart = this.timer !== null
            this.pauseTimer()

            this.startX = finger.pageX
            this.startY = finger.pageY
        },
        handleTouchmove (event) {
            if (this.disabledTouch) {
                return false
            }

            const finger = event.changedTouches[0]
            const moveX = finger.pageX - this.startX
            const moveY = finger.pageY - this.startY

            if (!this.moveDirection) {
                // 滑动幅度太小，不处理
                if (Math.abs(moveX) < 4 && Math.abs(moveY) < 4) {
                    return false
                }

                this.moveDirection = Math.abs(moveX) / Math.abs(moveY) > 1 ? 'horizontal' : 'vertical'
            }
            const move = this.moveDirection === 'horizontal' ? moveX : moveY

            this.needRespond = (() => {
                if (this.moveDirection !== this.direction) {
                    return false
                }
                if (move > 0 && !this.loop && this.currentIndex === 0) {
                    return false
                }
                if (move < 0 && !this.loop && this.currentIndex === this.items.length - 1) {
                    return false
                }
                return true
            })()

            if (!this.needRespond) {
                return false
            }
            event.preventDefault()

            this.moveItemsPosition(this.activeIndex, move)
            this.move = move
        },
        handleTouchend (event) {
            const distance = this.$el[this.direction === 'vertical' ? 'offsetHeight' : 'offsetWidth']
            this.moveDirection = ''

            if (this.disabledTouch || !this.needRespond) {
                return false
            }

            if (this.move < distance / -3) {
                this.next()
            } else if (this.move > distance / 3) {
                this.prev()
            } else {
                this.moveItemsPosition(this.currentIndex, 0, this.move < 0)
            }

            if (this.restart) {
                this.startTimer()
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.tm-carousel {
    position: relative;
    width: 100%;
    height: 4rem;
    overflow: hidden;

    &-transition {
        transition: transform 300ms ease-in-out;
    }
}
</style>
