<template>
<div class="page-demo">
  <demo-divider>基础用法</demo-divider>
  <tm-card
    class="center"
    poster="https://jhsy-img.jinghao.com/FidWc-ahvxGausDDzAfwv_hCEtXO"
    title="标题最多显示两行, 过长会自动省略, 过长会自动省略, 过长会自动省略"
    btn="￥199"></tm-card>

  <demo-divider>图片上添加描述</demo-divider>
  <tm-card
    class="center"
    poster="https://jhsy-img.jinghao.com/FidWc-ahvxGausDDzAfwv_hCEtXO"
    title="这是标题"
    btn="￥199">
    <tm-card-poster-bar class="fixed">
      <img src="./vip.png" alt="">
      <span>12648人已购</span>
    </tm-card-poster-bar>
  </tm-card>
</div>
</template>

<style lang="scss" scoped>
.center {
  margin: 0 auto;
}
.fixed {
  height: 18px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  span {
    font-size: 10px;
    line-height: 14px;
    color: #fff;
  }
  img {
    height: 100%;
  }
}
</style>
