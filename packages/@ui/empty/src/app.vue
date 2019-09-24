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
export default {
    name: 'TmEmpty',
    inheritAttrs: false,

    props: {
        image: {
            type: String,
            default: 'http://jhsy-img.caizhu.com/empty-default.png',
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
