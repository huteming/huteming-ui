<template>
  <div class="page-example page-demo">
    <button @click="disabled = !disabled">toggle disabled: {{ disabled }}</button>

    <TmImage
      v-image-picker="{ onload: handleLoad, disabled: disabled, before: before, after: after }"
      :src="image"
      style="width: 100px; height: 100px; margin: 0 auto;"
      hold />

    <!-- <base-divider>压缩后</base-divider> -->
    <!-- <img :src="imageCompressed" alt="" style="max-width: 100%;" /> -->

    <!-- <button @click="disabled = !disabled">disabled</button> -->

    <!-- <div class="content" v-image-picker="{ onload: handleLoadMultiple, multiple: true, max: max }">多选，最多4张</div> -->
    <!-- <img v-for="(item, index) in images" :key="index" :src="item" alt="" style="max-width: 100%;" /> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      image: '',
      imageCompressed: '',
      images: [],
      disabled: false,
    }
  },

  computed: {
    max () {
      return 4 - this.images.length
    },
  },

  methods: {
    before () {
      console.log('before')
    },
    after () {
      console.log('after')
    },
    handleLoad (dataURL, files) {
      this.image = dataURL
    },
    handleLoadMultiple (images) {
      this.images.push(...images)
    },
    handleImageLoad () {
      const { width, height } = getComputedStyle(this.$refs.image)
      alert(width)
      alert(height)
    },
  },
}
</script>

<style lang="scss" scoped>
.page-example {
    padding: 20px;
}

.content {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #999;
}
</style>
