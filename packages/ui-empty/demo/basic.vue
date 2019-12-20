<template>
  <div class="page-demo">
    <demo-divider>基础用法</demo-divider>
    <TmEmpty />

    <demo-divider>自定义image样式</demo-divider>
    <TmEmpty :image-style="{ height: '100px' }" :image="imgYou" />

    <demo-divider>自定义description样式</demo-divider>
    <TmEmpty :description-style="{ color: 'pink' }" description="暂无优惠券" />

    <demo-divider>description插槽</demo-divider>
    <tm-empty>
      <router-link to="/example">回到首页</router-link>
    </tm-empty>

    <demo-divider>隐藏图片</demo-divider>
    <tm-empty hidden-image>
    </tm-empty>
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
