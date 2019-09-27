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

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    inheritAttrs: false,
})
export default class TmEmpty extends Vue {
    @Prop({ type: String, default: 'http://jhsy-img.caizhu.com/empty-default.png' })
    image!: string

    @Prop({ type: Object })
    imageStyle: object | undefined

    @Prop({ type: String, default: '暂无数据' })
    description!: string

    @Prop({ type: Object })
    descriptionStyle: object | undefined
}
</script>
