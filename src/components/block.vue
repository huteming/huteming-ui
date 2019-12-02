<template>
<div class="demo-block">
    <div class="demo-block-title">{{ title }}</div>
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'DemoBlock',

    props: {
        title: String,
    },
}
</script>

<style lang="scss" scoped>
.demo-block {
    padding: 0 16px;

    &-title {
        margin: 0;
        padding: 32px 16px 16px;
        color: rgba(69, 90, 100, 0.6);
        font-weight: normal;
        font-size: 14px;
    }
}
</style>
