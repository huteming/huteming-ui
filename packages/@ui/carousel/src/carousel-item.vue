<template>
<div class="tm-carousel-item" :class="{ 'is-animating': animating }" :style="styles" v-show="ready">
    <slot></slot>
</div>
</template>

<script>
import { autoprefixer } from 'web-util/element/src/main'

export default {
    name: 'TmCarouselItem',

    props: {
        name: String,
    },

    data () {
        return {
            animating: false,
            translate: 0,
            move: 0,
            ready: false,
        }
    },

    computed: {
        parentDirection () {
            return this.$parent.direction
        },
        styles () {
            const translateType = this.parentDirection === 'vertical' ? 'translateY' : 'translateX'
            const _style = {
                transform: `${translateType}(${this.translate + this.move}px)`
            }

            return autoprefixer(_style)
        },
    },

    created () {
        this.$parent && this.$parent.updateItems()
    },

    destroyed () {
        this.$parent && this.$parent.updateItems()
    },

    methods: {
        processIndex (index, activeIndex, length) {
            if (activeIndex === 0 && index === length - 1) {
                return -1
            } else if (activeIndex === length - 1 && index === 0) {
                return length
            } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
                return length + 1
            } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
                return -2
            }
            return index
        },

        translateItem (index, activeIndex, oldIndex) {
            const length = this.$parent.items.length
            const distance = this.$parent.$el[this.parentDirection === 'vertical' ? 'offsetHeight' : 'offsetWidth']

            if (oldIndex !== -1) {
                this.animating = index === activeIndex || index === oldIndex
            }

            if (index !== activeIndex && length > 2 && this.$parent.loop) {
                index = this.processIndex(index, activeIndex, length)
            }

            this.translate = distance * (index - activeIndex)
            this.move = 0
            this.ready = true
        },
        /**
         * @argument {Boolean} direction true: 回滚到右边/下边; false: 回滚到左边/上边
         */
        moveItem (index, activeIndex, move, direction) {
            const total = this.$parent.items.length
            const loop = this.$parent.loop
            const self = index === activeIndex

            this.animating = (() => {
                if (move !== 0) {
                    return false
                }
                if (direction) {
                    if (loop && activeIndex === total - 1) {
                        return self || index === 0
                    }
                    return self || index === activeIndex + 1
                }
                if (loop && activeIndex === 0) {
                    return self || index === total - 1
                }
                return self || index === activeIndex - 1
            })()

            this.move = move
        },
    },
}
</script>

<style lang="scss" scoped>

</style>
