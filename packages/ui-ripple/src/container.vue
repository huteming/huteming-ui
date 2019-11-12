<template>
<div class="tm-ripple-container" @click="handleClick">
    <div class="tm-ripple-mask"
        v-for="item in ripples"
        :key="item.key"
        :style="item.style"
        @animationend="handleAnimationEnd($event, item.key)">
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            nextKey: 0,
            ripples: [],

            color: '',
            opacity: 0,
            center: false,
            disabled: false,
        }
    },

    methods: {
        handleClick (event) {
            this.start(event)
        },
        handleAnimationEnd (event, key) {
            if (event.animationName === 'ripple-fade') {
                const index = this.ripples.findIndex(item => item.key === key)
                if (index > -1) {
                    this.ripples.splice(index, 1)
                }
            }
        },
        start (event) {
            if (this.disabled) return

            let _style = {
                'background-color': this.color,
                opacity: this.opacity,
            }
            if (!this.center) {
                _style = Object.assign(_style, this.getRippleStyle(event))
            }

            this.ripples.push({
                key: this.nextKey++,
                style: _style,
            })
        },
        getRippleStyle (event) {
            const animationFunction = 'cubic-bezier(0.4, 0.0, 0.2, 1)'
            const offset = this.getOffset(this.$el)
            const elHeight = this.$el.offsetHeight
            const elWidth = this.$el.offsetWidth
            const isTouchEvent = event.touches && event.touches.length

            const pageX = isTouchEvent ? event.touches[0].pageX : event.pageX
            const pageY = isTouchEvent ? event.touches[0].pageY : event.pageY

            const pointerX = pageX - offset.left
            const pointerY = pageY - offset.top

            const topLeftDiag = this.calcDiag(pointerX, pointerY)
            const topRightDiag = this.calcDiag(elWidth - pointerX, pointerY)
            const botRightDiag = this.calcDiag(elWidth - pointerX, elHeight - pointerY)
            const botLeftDiag = this.calcDiag(pointerX, elHeight - pointerY)

            const rippleRadius = Math.max(
                topLeftDiag, topRightDiag, botRightDiag, botLeftDiag
            )

            const rippleSize = rippleRadius * 2
            const left = pointerX - rippleRadius
            const top = pointerY - rippleRadius

            return {
                height: rippleSize + 'px',
                width: rippleSize + 'px',
                top: top + 'px',
                left: left + 'px',
                animation: `ripple-fade ${animationFunction}, ripple-spread ${animationFunction}`,
                'animation-duration': `1s, ${1.25 * rippleSize}ms`,
            }
        },
        calcDiag (a, b) {
            return Math.sqrt((a * a) + (b * b))
        },
        getOffset (element) {
            const box = element.getBoundingClientRect()
            const body = document.body

            const clientTop = element.clientTop || body.clientTop || 0
            const clientLeft = element.clientLeft || body.clientLeft || 0
            const scrollTop = window.pageYOffset || element.scrollTop
            const scrollLeft = window.pageXOffset || element.scrollLeft

            return {
                top: box.top + scrollTop - clientTop,
                left: box.left + scrollLeft - clientLeft,
            }
        },
    },
}
</script>
