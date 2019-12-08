import { Component, Prop, Vue, InjectReactive, Mixins } from 'vue-property-decorator'
import TmFlex from './flex'
import styled, { css } from 'vue-styled-components'
import { withStyles } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'
import { ChildrenMixin } from 'ui/mixins/relation'

const RootProps = {
    align: String,
    order: Number,
    grow: Number,
    shrink: Number,
    basis: String,
    gutter: String,
    ellipsis: [Number, Boolean],
}

const styles = (styled: any, css: any) => {
    return {
        Root: styled('div', RootProps, (props: StyleProps) => `
            align-self: ${props.align};
            order: ${props.order};
            flex: ${props.grow} ${props.shrink} ${props.basis};
            margin: ${props.gutter};
            ${() => props.ellipsis && css`
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: ${typeof props.ellipsis === 'number' ? props.ellipsis : 1};
                -webkit-box-orient: vertical;
            `}
        `),
    }
}

class FlexItem extends Mixins(ChildrenMixin('flex')) {
    render () {
        const { Root } = this.styledDoms
        return (
            <Root
                align={ this.normalizedAlign }
                order={ this.order }
                grow={ this.normalizedGrow }
                shrink={ this.shrink }
                basis={ this.normalizedBasis }
                gutter={ this.normalizedGutter }
                ellipsis={ this.ellipsis }>
                { this.$slots.default }
            </Root>
        )
    }

    get normalizedGutter (): string {
        return this.gutter || this.parent.gutter
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

    // 过长省略
    // 可以理解为预设值, 关联 grow, basis
    // 建议不要和 width 混合使用, 因为 width 会覆盖 basis
    @Prop({ type: [Boolean, Number], default: false })
    ellipsis!: boolean | number
}

export default withStyles(styles)(FlexItem, { name: 'TmFlexItem' })
