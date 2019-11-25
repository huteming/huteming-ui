<template>
<div class="tm-cell">
    <div class="tm-cell__hd" v-if="header || $slots.header">
        <slot name="header">{{ header }}</slot>
    </div>

    <div class="tm-cell__bd" v-if="body || $slots.body">
        <slot name="body">{{ body }}</slot>
    </div>

    <div class="tm-cell__ft" v-if="footer || $slots.default">
        <slot>{{ footer }}</slot>
    </div>

    <div class="tm-cell__link" v-if="link"></div>
</div>
</template>

<script>
export default {
    name: 'DemoCell',

    props: {
        header: {
            type: String,
        },
        body: {
            type: String,
        },
        footer: {
            type: String,
        },
        link: {
            type: Boolean,
        },
    },
}
</script>

<style lang="scss" scoped>
$cell-padding-top: 16px !default;
$cell-padding-bottom: 16px !default;
$cell-padding-left: 16px !default;
$cell-padding-right: 16px !default;

.tm-cell {
    position: relative;
    width: 100%;
    padding: $cell-padding-top $cell-padding-right $cell-padding-bottom $cell-padding-left;
    display: flex;
    align-items: center;
    font-size: 17px;
    line-height: 1.41176471;
    background: #fff;
    box-sizing: border-box;

    &__hd {
        width: 105px;
        word-wrap: break-word;
        word-break: break-all;
    }

    &__bd {
        flex: 1;
    }

    &__ft {
        color: rgba(0, 0, 0, 0.5);
        text-align: right;
    }

    &__link {
        position: relative;
        margin-left: 14px;
        width: 14.2px;
        height: 14.2px;

        &:after {
            content: ' ';
            position: absolute;
            top: 50%;
            margin-top: -5px;
            height: 8px;
            width: 8px;
            border-width: 2px 2px 0 0;
            border-color: #B2B2B2;
            border-style: solid;
            transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        }
    }

    & + &:before {
        content: ' ';
        position: absolute;
        left: $cell-padding-left;
        right: 0;
        top: 0;
        height: 1px;
        transform: scaleY(.5);
        background: rgba(0, 0, 0, 0.1);
        z-index: 2;
    }
}
</style>
