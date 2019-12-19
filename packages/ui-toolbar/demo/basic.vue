<template>
  <div class="page-demo">
    <demo-divider>带有标题</demo-divider>
    <TmToolbar title="标题栏" @confirm="handleConfirm" @cancel="handleCancel" />

    <demo-divider>无标题</demo-divider>
    <TmToolbar />

    <demo-divider>带有标题</demo-divider>
    <TmToolbar title="标题栏" :show-confirm="false" />
  </div>
</template>

<script>
export default {
  methods: {
    handleConfirm () {
      this.$toast('点击确定')
    },
    handleCancel () {
      this.$toast('点击取消')
    },
  },
}
</script>

<style lang="scss" scoped>
.demo {
    min-height: 100vh;
    background: #f9f9f9;
}
</style>
