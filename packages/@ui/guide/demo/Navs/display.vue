<template>
<div class="display" :style="styles">
    <img src="./images/text.png" alt="" />
</div>
</template>

<script>
export default {
    props: {
        extra: Object,
        top: {},
        left: {},
        width: {},
        height: {},
    },

    computed: {
        styles () {
            return {
                top: `${this.top + this.height + 20}px`,
                left: `78px`,
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.display {
    position: absolute;

    img {
        width: 240px;
        height: 140px;
        display: block;
    }
}
</style>
