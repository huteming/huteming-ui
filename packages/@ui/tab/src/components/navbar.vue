<template>
<div class="tm-tab-navbar">
    <slot></slot>
</div>
</template>

<script>
export default {
    props: {
        value: String,
        grow: Number,
    },

    data () {
        return {
        }
    },

    mounted () {
    },
}
</script>

<style lang="scss" scoped>
.tm-tab-navbar {
    display: flex;
    font-size: 15px;
    line-height: 1.4;
    color: #303030;
    // background-color: #fff;
}
</style>
