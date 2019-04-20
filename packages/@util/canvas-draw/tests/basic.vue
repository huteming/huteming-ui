<template>
<div id="app">
    <h1>Welcome to Your Vue.js App</h1>
    <img id="png" :src="imgPng" alt="" class="img-block">
    <img id="jpg" :src="imgJpg" alt="" class="img-block">
</div>
</template>

<script>
import CanvasDraw from '../index'
import imgLogo from '@/assets/images/logo.png'

export default {
    data () {
        return {
            imgPng: '',
            imgJpg: '',
        }
    },

    async mounted () {
        const domLogo = await this.loadImage(imgLogo)
        const instance = new CanvasDraw(750, 500)

        // drawArc
        instance.add(() => {
            instance.drawArc(0, 0, 100, { color: '#000' })
        })

        // drawRect
        instance.add(() => {
            instance.drawRect(220, 0, 200, 200, { color: '#000', r: 10 })
        })

        // drawText
        instance.add(() => {
            instance.drawText('hello', 0, 220)
        })

        // drawLine
        instance.add(() => {
            instance.drawLine(220, 220, 420, 220, { lineWidth: 2 })
        })

        // drawImage
        instance.add(() => {
            instance.drawImage(domLogo, 0, 250, 200, 200)
        })

        this.imgPng = instance.done()
        this.imgJpg = instance.done('jpeg')
    },

    methods: {
        loadImage (url) {
            return new Promise((resolve, reject) => {
                const img = new Image()
                const separator = url.indexOf('?') > -1 ? '&' : '?'
                img.setAttribute('crossOrigin', 'anonymous')

                img.onload = function () {
                    resolve(img)
                }
                img.onerror = function () {
                    reject(new Error(`渲染地址错误[${url}]`))
                }

                img.src = `${url}${separator}timestamp=${Date.now()}`
            })
        },
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
