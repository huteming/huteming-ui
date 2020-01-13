<template>
  <div class="page-demo">
    <demo-cell body="loading">
      <tm-switch v-model="loading"></tm-switch>
    </demo-cell>
    <demo-cell body="use text">
      <tm-field v-model="text" placeholder="请输入"></tm-field>
    </demo-cell>
    <button @click="handleToggle">快速切换</button>
    <button @click="handleDestroy">手动销毁</button>

    <demo-divider>分隔线</demo-divider>

    <div v-loading="{ loading, text, theme }" class="demo-block" ref="target">
      <h1 v-for="item in count" :key="item">hello world</h1>
    </div>
  </div>
</template>

<script>
import Loading from '../src/main'

export default {
  data () {
    return {
      loading: true,
      text: '',
      count: 1,
      theme: {
        colorIcon: '#409eff',
        colorText: '#409eff',
      },
    }
  },

  mounted () {
    // setTimeout(() => {
    //     this.count = 10
    // }, 10000)
    // this.loading = false

    // setTimeout(() => {
    //     this.loading = false
    // }, 2000)

    // setTimeout(() => {
    //     this.loading = false
    // }, 4000)
  },

  methods: {
    handleDestroy () {
      Loading.destroy(this.$refs.target)
    },
    handleToggle () {
      Loading.open(this.$refs.target)
      Loading.close(this.$refs.target)
      // setTimeout(() => {
      //   Loading.close(this.$refs.target)
      // }, 50)
    },
  },

  directives: {
    Loading,
  },
}
</script>

<style lang="scss" scoped>
.demo-block {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  color: #fff;
  background: lightgreen;
}
</style>
