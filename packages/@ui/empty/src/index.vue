<template>
<div class="tm-empty">
    <div class="tm-empty-image" :style="imageStyle">
        <img :src="image" alt="">
    </div>

    <div class="tm-empty-description" :style="descriptionStyle">
        <slot>{{ description }}</slot>
    </div>
</div>
</template>

<script>
import imgDefault from './images/default.png'

export default {
    name: 'TmEmpty',

    inheritAttrs: false,

    props: {
        image: {
            type: String,
            default: imgDefault,
        },
        imageStyle: {},
        description: {
            type: String,
            default: '暂无数据',
        },
        descriptionStyle: {},
    },
}
</script>

<style lang="scss" scoped>
.tm-empty {
    min-height: rem(300);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-image {
        height: rem(200);
        margin-bottom: rem(18);

        img {
            height: 100%;
            vertical-align: middle;
            border-style: none;
        }
    }

    &-description {
        font-size: rem(32);
        line-height: rem(44);
        color: rgba(178, 186, 196, 1);
    }
}
</style>
