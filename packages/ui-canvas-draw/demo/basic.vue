<template>
<div class="example-canvas">
    <p>这是一段常规文案</p>
    <img :src="img" alt="" class="img-block">
</div>
</template>

<script>
import CanvasDraw from '../src/main'
import bgAdmission from './images/bg-admission.png'
import { loadImages } from 'packages/ui-tools/src/main'

export default {
    data () {
        return {
            img: '',
        }
    },

    async mounted () {
        this.initText()
        // this.initImage()
    },

    methods: {
        async initText () {
            const instance = new CanvasDraw(704, 978)
            const x = 50
            const y = 516
            const options = {
                size: 26,
                color: 'rgb(142, 146, 150)',
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
                    '<underline><through>这是一段很长很长很长很长需要换行而且添加下划线的文案</through></underline>学员，请于<underline>2019</underline>年<underline>22</underline>月<underline>22</underline>日前' +
                    '<underline><through>这是令一段很长很长很长很长需要换行而且添加下</through></underline>',
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

            instance.add(() => {
                instance.drawText('<through>删除线</through>', x, y + 150, {
                    size: 26,
                    color: 'rgba(0, 0, 0, 1)',
                })
            })

            this.img = instance.done()
        },
        async initArc () {
            const x = 50
            const y = 20
            const r = 50
            const spacing = 120
            this.img = new CanvasDraw(704, 978)
                .add(ins => {
                    ins.drawLine(x, y, x, y + spacing * 4)
                })
                .add(ins => {
                    ins.drawArc(x, y, r, {
                        endDegrees: 270,
                        lineWidth: 6,
                        color: '#000',
                        type: 'stroke',
                    })

                    ins.drawArc(x, y + spacing * 1, r, {
                        endDegrees: 270,
                        lineWidth: 2,
                        color: '#000',
                        type: 'stroke',
                    })

                    ins.drawArc(x, y + spacing * 2, r, {
                        endDegrees: 270,
                        lineWidth: 2,
                        fillColor: '#ec1919',
                        strokeColor: '#000',
                        type: ['fill', 'stroke'],
                        direction: true,
                    })

                    ins.drawArc(x, y + spacing * 3, r, {
                        endDegrees: 270,
                        lineWidth: 1,
                        fillColor: '#ec1919',
                        strokeColor: '#000',
                        type: ['fill'],
                    })

                    ins.drawArc(x, y + spacing * 4, r, {
                        endDegrees: 270,
                        lineWidth: 1,
                        fillColor: '#ec1919',
                        strokeColor: '#000',
                        type: ['stroke', 'closePath'],
                    })

                    ins.drawArc(x, y + spacing * 5, r, {
                        endDegrees: 270,
                        lineWidth: 2,
                        fillColor: '#ec1919',
                        strokeColor: '#000',
                        type: ['stroke', 'fill', 'closePath'],
                    })
                })
                .done()
        },
        async initImage () {
            const _imgBg = await loadImages(bgAdmission)
            this.img = new CanvasDraw(704, 978)
                .add(ins => {
                    ins.drawImage(_imgBg, 0, 0, 704, 978)
                })
                .done()
        },
    },
}
</script>
