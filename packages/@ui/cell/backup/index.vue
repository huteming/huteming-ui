<template>
<article class="tm-cell">
    <div class="tm-cell-header" v-if="header || $slots.header">
        <slot name="header">{{ header }}</slot>
    </div>

    <div class="tm-cell-content">
        <div class="tm-cell__hd" v-if="title || $slots.title">
            <slot name="title">{{ title }}</slot>
        </div>

        <div class="tm-cell__bd" v-if="description || $slots.default">
            <slot>{{ description }}</slot>
        </div>

        <div class="tm-cell__ft" v-if="tip || $slots.tip">
            <slot name="tip"></slot>
        </div>

        <div class="tm-cell__link" v-if="link"></div>
    </div>

    <div class="tm-cell-footer" v-if="footer || $slots.footer">
        <slot name="footer">{{ footer }}</slot>
    </div>
</article>
</template>

<script>
export default {
    props: {
        header: String,
        title: String,
        description: String,
        tip: String,
        footer: String,
        link: Boolean,
    },
}
</script>

<style lang="scss" scoped>
// $cell-content-height: rem(111.6);
$cell-content-padding-top: rem(32);
$cell-content-padding-left: rem(32);

// 选择器控制 header、footer 显隐
// 要求相邻元素中不能使用 article 标签
// article:first-of-type {
//     > .tm-cell-header {
//         display: block;
//     }
// }
// article:last-of-type {
//     > .tm-cell-footer {
//         display: block;
//     }
// }

.tm-cell {
    position: relative;

    &__hd {
        width: rem(210);
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
        margin-left: rem(28);
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

    &-header {
        // display: none;
        padding: rem(32) rem(32) rem(6) rem(32);
        font-size: rem(28);
        line-height: 1.4;
        color: rgba(0, 0, 0, 0.5);
        background: #ededed;
    }

    &-content {
        position: relative;
        padding: $cell-content-padding-top $cell-content-padding-left;
        display: flex;
        align-items: center;
        font-size: rem(34);
        line-height: 1.4;
        background: #fff;
        box-sizing: border-box;
    }

    &-footer {
        // display: none;
        padding: rem(8.4) rem(32) 0 rem(32);
        font-size: rem(28);
        color: rgba(0, 0, 0, 0.5);
        background: #ededed;
    }

    // & + &:before {
    //     content: ' ';
    //     position: absolute;
    //     left: $cell-content-padding-left;
    //     right: 0;
    //     top: 0;
    //     height: 1px;
    //     transform: scaleY(.5);
    //     background: rgba(0, 0, 0, 0.1);
    //     z-index: 2;
    // }
}
</style>
