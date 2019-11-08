import { Component, Prop, Vue, InjectReactive } from 'vue-property-decorator'
import TmFlex from './flex'
import styled, { css } from 'vue-styled-components'

@Component({
    name: 'TmFlexItem',
})
export default class TmFlexItem extends Vue {
    render () {
        const { normalizedAlign, order, ellipsis, normalizedGrow, shrink, normalizedBasis, normalizedGutter } = this
        const Container = styled.div`
            align-self: ${normalizedAlign};
            order: ${order};
            flex: ${normalizedGrow} ${shrink} ${normalizedBasis};
            margin: ${normalizedGutter};
            ${() => ellipsis && css`
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: ${typeof ellipsis === 'number' ? ellipsis : 1};
                -webkit-box-orient: vertical;
            `}
        `
        return (
            <Container>
                { this.$slots.default }
            </Container>
        )
    }

    get normalizedGutter (): string {
        return this.gutter || this.parentGutter
    }

    get normalizedAlign (): string {
        switch (this.align) {
        case 'start':
            return 'flex-start'
        case 'end':
            return 'flex-end'
        default:
            return this.align
        }
    }

    get normalizedGrow (): number {
        if (this.ellipsis && this.basis === 'auto' && this.grow === 0) {
            return 1
        }
        return this.grow
    }

    get normalizedBasis (): string {
        if (this.ellipsis && this.basis === 'auto') {
            return '0'
        }
        return this.basis
    }

    $parent!: TmFlex

    @Prop({ type: Number, default: 0 })
    order!: number

    @Prop({ type: Number, default: 0 })
    grow!: number

    @Prop({ type: Number, default: 0 })
    shrink!: number

    @Prop({ type: String, default: 'auto' })
    basis!: string

    @Prop({
        type: String,
        default: 'auto',
        validator (val) {
            return ['auto', 'start', 'center', 'end', 'baseline', 'stretch'].includes(val)
        },
    })
    align!: string

    @Prop({ type: String })
    gutter: string | undefined

    @InjectReactive('gutter')
    parentGutter!: string

    // 过长省略
    // 可以理解为预设值, 关联 grow, basis
    // 建议不要和 width 混合使用, 因为 width 会覆盖 basis
    @Prop({ type: [Boolean, Number], default: false })
    ellipsis!: boolean | number
}
