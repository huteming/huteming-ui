<template>
<div class="example-canvas">
    <p>这是一段常规文案</p>
    <img :src="img" alt="" class="img-block">
</div>
</template>

<script>
import CanvasDraw from '../index'
import bgAdmission from './images/bg-admission.png'
import { loadImages } from 'web-util/tool/src/main'

export default {
    data () {
        return {
            img: '',
        }
    },

    async mounted () {
        const instance = new CanvasDraw(704, 978)
        const x = 50
        const y = 516
        const options = {
            size: 26,
            color: 'rgba(0, 0, 0, 1)',
            wrap: true,
            maxWidth: 602,
        }
        const [_imgBg] = await loadImages([bgAdmission])

        instance.add(() => {
            instance.drawImage(_imgBg, 0, 0, 704, 978)
        })

        // 前缀 后缀
        instance.add(() => {
            const { actualMaxWidth, actualMaxHeight } = instance.drawText(
                '<underline>这是一段很长很长很长很长需要换行而且添加下划线的文案</underline>学员，请于<underline>2019</underline>年<underline>22</underline>月<underline>22</underline>日前' +
                '<underline>这是令一段很长很长很长很长需要换行而且添加下</underline>',
                x,
                y,
                { ...options }
            )

            instance.drawRect(x, y, actualMaxWidth, actualMaxHeight, { type: 'stroke', color: '#000' })
        })

        instance.add(() => {
            instance.drawText('不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行不换行', x, y - 60, {
                size: 26,
                color: 'rgba(0, 0, 0, 1)',
                maxWidth: 602,
                wrap: false,
            })
        })

        instance.add(() => {
            instance.drawText('换行一次换行一次换行一次换行一次换行一次换行一次换行一次换行一次换行一次换行一次换行一次换行一次换行一次换行一次换行一次换行一次', x, y - 150, {
                size: 26,
                color: 'rgba(0, 0, 0, 1)',
                maxWidth: 602,
                wrap: 1,
            })
        })

        this.img = instance.done()
    },
}
</script>
