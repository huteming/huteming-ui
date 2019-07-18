<template>
<i class="tm-icon" :class="classes"></i>
</template>

<script>
export default {
    name: 'TmIcon',

    props: {
        icon: {
            type: String,
            required: true,
        },
    },

    computed: {
        classes () {
            return `icon-${this.icon}`
        },
    },
}
</script>

<style lang="scss" scoped>
@import url(//at.alicdn.com/t/font_1301011_rb1ygfxghdh.css);

.tm-icon {
    display: inline-block;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
}

.icon-loading {
    animation: loading 1.5s linear infinite;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(1turn);
    }
}
</style>
