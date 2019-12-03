<template>
<div id="app">
    <h1>Welcome to Your Vue.js App</h1>

    <!-- <div style="position: relative;">
        <img :src="bgFilter" alt="" style="position: absolute; left: 0; width: 326px; height: 496px;">
        <img :src="bgTitle2" alt="" style="position: absolute; top: 212px; left: 26px; width: 226px; height: 153px; filter: blur(5px);">
        <div style="position: absolute; top: 212px; left: 26px; width: 226px; height: 153px; background: #fff; filter: blur(1px);"></div>
    </div> -->
    <img id="png" :src="imgPng" alt="" class="img-block">
    <img id="jpg" :src="imgJpg" alt="" class="img-block">
</div>
</template>

<script>
import CanvasDraw from '../src/main'
// import imgLogo from '@/assets/images/logo.png'
import { loadImages } from 'packages/ui-tools/src/main'
import bgFilter from './images/bg-filter.png'
import bgTitle2 from './images/bg-title2.png'
import bgTitle from './images/e.png'

export default {
    data () {
        return {
            imgPng: '',
            imgJpg: '',
            bgFilter,
            bgTitle,
            bgTitle2,
        }
    },

    async mounted () {
        const [_bgFilter] = await loadImages([bgFilter])

        const instance = new CanvasDraw(652, 992)

        // 背景
        instance.add(({ canvas }) => {
            instance.drawImage(_bgFilter, 0, 0, 652, 992)
        })

        // 高斯模糊
        instance.add(({ context, canvas, ratio, canvasWidth, canvasHeight }) => {
            const x = 52
            const y = 424
            const width = 552
            const height = 177
            const r = '20 20 -20 -20'

            const blurryCanvas = instance.getBlurryArea(100, x, y, width, height)
            // 创建不规则区域然后将模糊图像渲染
            instance.drawRect(x, y, width, height, { r })
            context.clip()
            instance.drawImage(blurryCanvas, x, y, width, height)
            instance.drawRect(x, y, width, height, { r, color: 'rgba(255, 255, 255, 0.62)' })
        })

        // 高斯模糊
        instance.add(({ context, canvas, ratio, canvasWidth, canvasHeight }) => {
            const x = 52
            const y = 600
            const width = 552
            const height = 127
            const r = '-20 -20 20 20'

            const blurryCanvas = instance.getBlurryArea(100, x, y, width, height)
            // 创建不规则区域然后将模糊图像渲染
            instance.drawRect(x, y, width, height, { r })
            context.clip()
            instance.drawImage(blurryCanvas, x, y, width, height)
            instance.drawRect(x, y, width, height, { r, color: 'rgba(255, 255, 255, 0.62)' })
        })

        // 高斯模糊
        instance.add(({ context, canvas, ratio, canvasWidth, canvasHeight }) => {
            const x = 52
            const y = 748
            const width = 552
            const height = 192
            const r = '20 20 20 20'

            const blurryCanvas = instance.getBlurryArea(100, x, y, width, height)
            // 创建不规则区域然后将模糊图像渲染
            instance.drawRect(x, y, width, height, { r })
            context.clip()
            instance.drawImage(blurryCanvas, x, y, width, height)
            instance.drawRect(x, y, width, height, { r, color: 'rgba(255, 255, 255, 0.62)' })
        })

        // 虚线
        instance.add(() => {
            instance.drawLine(72, 601, 584, 601, { color: 'rgba(255, 255, 255, 1)', dashed: [10, 10], lineWidth: 2 })
        })

        this.imgPng = instance.done()
        this.imgJpg = instance.done('jpeg')
    },

    methods: {
    },
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.img-block {
    display: block;
    width: 100%;
}
</style>
