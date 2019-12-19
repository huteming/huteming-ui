<template>
  <div class="placeholder">
    <slot>Block</slot>
  </div>
</template>

<script>
export default {
  name: 'DemoPlaceholder',
}
</script>

<style lang="scss" scoped>
.placeholder {
  text-align: center;
  background: #fff;
}
</style>
