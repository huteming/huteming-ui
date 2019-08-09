<template>
<transition name="t-ripple">
    <div class="t-ripple-mask" :style="styles"></div>
</transition>
</template>

<script>
export default {
    props: {
        mergeStyle: Object,
        opacity: Number,
        color: String,
    },

    computed: {
        styles () {
            return {
                opacity: this.opacity,
                'background-color': this.color,

                ...this.mergeStyle,
            }
        }
    },

    methods: {
        handleAnimationEnd () {
            console.log('end')
            this.$el.parentNode.removeChild(this.$el)
        },
    },
}
</script>

<style lang="scss" scoped>
@import './style/mask.scss';
</style>
