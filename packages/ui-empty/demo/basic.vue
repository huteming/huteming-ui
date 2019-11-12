<template>
<div class="demo">
    <tm-divider>100%高度</tm-divider>

    <div style="height: 400px; background: rgb(247, 247, 247);">
        <TmEmpty />
    </div>

    <tm-divider>默认高度</tm-divider>

    <div style="background: rgb(247, 247, 247);">
        <TmEmpty />
    </div>

    <tm-divider>自定义image样式</tm-divider>

    <div style="background: rgb(247, 247, 247);">
        <TmEmpty :image-style="{ height: '100px' }" :image="imgYou" />
    </div>

    <tm-divider>自定义description样式</tm-divider>

    <div style="background: rgb(247, 247, 247);">
        <TmEmpty :description-style="{ color: 'pink' }" description="暂无优惠券" />
    </div>

    <tm-divider>description插槽</tm-divider>

    <div style="background: rgb(247, 247, 247);">
        <tm-empty>
            <router-link to="/example">回到首页</router-link>
        </tm-empty>
    </div>
</div>
</template>

<script>
import imgYou from './youhuiquan.png'

export default {
    data () {
        return {
            imgYou,
        }
    },
}
</script>
