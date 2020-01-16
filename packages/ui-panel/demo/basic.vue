<template>
<div class="page-demo">
    <demo-divider>多行省略</demo-divider>
    <tm-panel
      poster="https://jhsy-img.jinghao.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
      title="张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论"
      tip="加入学习"
      decoration="￥99"
      btn="￥2.99">
    </tm-panel>

    <demo-divider>title 单行</demo-divider>
    <tm-panel
      poster="https://jhsy-img.jinghao.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
      title="张萌人生效率手册"
      tip="加入学习"
      decoration="￥99"
      btn="￥2.99">
    </tm-panel>

    <demo-divider>tip缺省</demo-divider>
    <tm-panel
      poster="https://jhsy-img.jinghao.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
      title="张萌人生效率手册：时间管理课高效人生的法制"
      decoration="￥99"
      btn="￥2.99">
    </tm-panel>

    <demo-divider>btn缺省</demo-divider>
    <tm-panel
      poster="https://jhsy-img.jinghao.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
      title="张萌人生效率手册：时间管理课高效人生的法制">
    </tm-panel>

    <demo-divider>间距</demo-divider>
    <tm-panel
      poster="https://jhsy-img.jinghao.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
      title="张萌人生效率手册：时间管理课高效人生的法制">
    </tm-panel>
    <tm-panel
      poster="https://jhsy-img.jinghao.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
      title="张萌人生效率手册：时间管理课高效人生的法制">
    </tm-panel>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.demo {
    &-price {
        font-size: .28rem;
        line-height: .4rem;
        color: rgba(230, 198, 136, 1);
    }

    &-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: .32rem;
        padding-right: .04rem;
        background: rgba(0, 0, 0, .3);
        box-sizing: border-box;

        &-text {
            font-size: .2rem;
            line-height: .28rem;
            color: rgba(255, 255, 255, 1);
            text-align: right;
        }
    }
}
</style>
