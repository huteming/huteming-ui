<template>
  <div class="display" :style="styles">
    <img src="./images/personal.png" alt="" />
    {{ extra }}
  </div>
</template>

<script>
export default {
  props: {
    extra: Object,
    top: {},
    left: {},
  },

  computed: {
    styles () {
      return {
        top: `${this.top + this.height + 20}px`,
        left: `${this.left - 20}px`,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.display {
    position: absolute;

    img {
        width: 240px;
        height: 140px;
        display: block;
    }
}
</style>
