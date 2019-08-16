<template>
<div class="example-canvas">
    <img :src="img" alt="" class="img-block">
</div>
</template>

<script>
import CanvasDraw from '../index'

export default {
    data () {
        return {
            img: '',
        }
    },

    mounted () {
        const instance = new CanvasDraw(750, 1000)

        // instance.add(({ context, canvas, ratio, width, height }) => {
        //     const x = 24
        //     const y = 93
        //     const { actualMaxWidth, actualMaxHeight } = instance.drawText('这是一段超出最大宽度的文本！这是一段超出最大宽度的文本！', x, y, { wrap: true, maxWidth: 100 })
        //     instance.drawRect(x, y, actualMaxWidth, actualMaxHeight, { type: 'stroke', color: 'rgba(0, 0, 0, 1)' })
        // })

        instance.add(({ context, canvas, ratio, width, height }) => {
            const x = 24
            const y = 93
            instance.drawText('这是一段超出最大宽度的文本！这是一段超出最大宽度的文本！', x, y, { wrap: true, maxWidth: 100, size: 20, lineHeight: 30, underline: true })
        })

        this.img = instance.done()
    },
}
</script>
