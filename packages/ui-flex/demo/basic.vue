<template>
<div class="page-demo">
  <demo-divider>过长省略</demo-divider>
  <div class="bg-white">
    <tm-flex container>
      <tm-flex>
        <div class="placeholder">无间距</div>
      </tm-flex>
      <tm-flex :ellipsis="2">
        <p>很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长</p>
      </tm-flex>
    </tm-flex>
  </div>

  <demo-divider>间距</demo-divider>
  <tm-flex class="bg-white" container>
    <tm-flex :grow="1" gutter="0 8px">
      <div class="placeholder">8px</div>
    </tm-flex>
    <tm-flex :grow="1" gutter="0 15px">
      <div class="placeholder">15px</div>
    </tm-flex>
    <tm-flex :grow="1" gutter="0 8px">
      <div class="placeholder">8px</div>
    </tm-flex>
  </tm-flex>

  <demo-divider>换行</demo-divider>
  <tm-flex wrap class="bg-white" container>
    <tm-flex>
      <div class="placeholder inline">Block</div>
    </tm-flex>
    <tm-flex>
      <div class="placeholder inline">Block</div>
    </tm-flex>
    <tm-flex>
      <div class="placeholder inline">Block</div>
    </tm-flex>
    <tm-flex>
      <div class="placeholder inline">Block</div>
    </tm-flex>
  </tm-flex>

  <demo-divider>交叉轴对齐</demo-divider>
  <tm-flex align="center" class="bg-white" container>
    <tm-flex :grow="1">
      <div class="placeholder small"></div>
    </tm-flex>
    <tm-flex :grow="1">
      <div class="placeholder"></div>
    </tm-flex>
    <tm-flex :grow="1">
      <div class="placeholder large">center</div>
    </tm-flex>
  </tm-flex>

  <demo-divider>主轴对齐</demo-divider>
  <tm-flex justify="center" class="bg-white" container>
    <tm-flex>
      <div class="placeholder inline small">center</div>
    </tm-flex>
    <tm-flex>
      <div class="placeholder inline"></div>
    </tm-flex>
    <tm-flex>
      <div class="placeholder inline large"></div>
    </tm-flex>
  </tm-flex>
</div>
</template>

<script>
export default {
  data () {
    return {
      gutter: '20px'
    }
  },

  mounted () {
    setTimeout(() => {
      this.gutter = '10px'
    }, 1000)
  },
}
</script>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
.bg-white {
  background: #fff;
}

.container {
  height: 100px;
  margin-bottom: 20px;
  background: #fff;
}

.placeholder {
  background-color: #ebebef;
  color: #bbb;
  text-align: center;
  height: 30px;
  line-height: 30px;
  width: 100%;

  &.inline {
    width: 100px;
  }

  &.small {
    font-size: 12px;
    height: 15px;
    line-height: 15px;
  }

  &.large {
    height: 50px;
    line-height: 50px;
  }
}
</style>
