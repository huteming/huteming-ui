import { Component, Prop, Vue } from 'vue-property-decorator'
import { VNode } from 'vue'
import TmFlex from '../types/flex'

@Component
export default class TmFlexItem extends Vue {
    render (): VNode {
        const { styles, classes, $slots } = this
        return (
            <div class={ classes } style={ styles } >
                { $slots.default }
            </div>
        )
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

    // 过长省略
    // 可以理解为预设值, 关联 grow, basis
    // 建议不要和 width 混合使用, 因为 width 会覆盖 basis
    @Prop({ type: [Boolean, Number], default: false })
    ellipsis!: boolean | number

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

    get styles (): object {
        const res = {
            order: this.order,
            'flex-grow': this.normalizedGrow,
            'flex-shrink': this.shrink,
            'flex-basis': this.normalizedBasis,
            'margin': this.gutter || this.$parent.gutter,
        }

        if (typeof this.ellipsis === 'number') {
            (res as any)['-webkit-line-clamp'] = this.ellipsis
        }

        return res
    }

    get classes (): object {
        return {
            'tm-flexbox-item': true,
            [`is-self-${this.align}`]: true,
            'tm-ellipsis': this.ellipsis,
        }
    }
}
