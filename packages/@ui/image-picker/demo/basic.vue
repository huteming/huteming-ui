<template>
<div class="page-example">
    <button @click="disabled = !disabled">toggle disabled: {{ disabled }}</button>

    <TmImage
         v-image-picker="{ onload: handleLoad, disabled: disabled }"
        :src="image"
        style="width: 100px; height: 100px; margin: 0 auto;" />

    <!-- <base-divider>压缩后</base-divider> -->
    <!-- <img :src="imageCompressed" alt="" style="max-width: 100%;" /> -->

    <!-- <button @click="disabled = !disabled">disabled</button> -->

    <!-- <div class="content" v-image-picker="{ onload: handleLoadMultiple, multiple: true, max: max }">多选，最多4张</div> -->
    <!-- <img v-for="(item, index) in images" :key="index" :src="item" alt="" style="max-width: 100%;" /> -->
</div>
</template>

<script>
import ImagePicker from '../index'
import TmImage from 'web-ui/image/index'

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

    mounted () {
    },

    methods: {
        handleLoad (dataURL) {
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

    components: {
        TmImage,
    },

    directives: {
        ImagePicker,
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
