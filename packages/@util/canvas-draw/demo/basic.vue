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
        const instance = new CanvasDraw(375, 500)

        instance.add(({ context, canvas, ratio, width, height }) => {
            instance.drawText('hello world', 24, 93)
        })

        this.img = instance.done()
    },
}
</script>
