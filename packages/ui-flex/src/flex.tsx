import { Prop, Vue } from 'vue-property-decorator'
import { ellipsis, StyledComponent, DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { StyleProps } from 'packages/ui-styles/types'
import { FlexJustify, FlexAlign, FlexContent, FlexAlignSelf } from '../types/flex'
const bem = createBEM('flex')
const bemItem = createBEM('flex-item')

const RootProps = {
  container: Boolean,

  direction: String,
  wrap: String,
  justify: String,
  align: String,
  alignContent: String,

  alignSelf: String,
  order: Number,
  grow: Number,
  shrink: Number,
  basis: String,
  gutter: String,
  ellipsis: [Number, Boolean],
}

const styles = (styled: any, css: any) => {
  return {
    Root: styled('div', RootProps, (props: StyleProps) => css`
      ${props.container && `
        display: flex;
      `}
      flex-flow: ${props.direction} ${props.wrap};
      align-items: ${props.align};
      align-content: ${props.alignContent};
      justify-content: ${props.justify};

      align-self: ${props.alignSelf};
      order: ${props.order};
      flex: ${props.grow} ${props.shrink} ${props.basis};

      margin: ${props.gutter};
      ${props.ellipsis && ellipsis(typeof props.ellipsis === 'number' ? props.ellipsis : 1)}
    `),
  }
}

@DescribedComponent({
  name: 'TmFlex',
})
@StyledComponent(styles)
export default class Flex extends Vue {
  render () {
    const { Root } = this.styledComponents
    return (
      <Root
        ref="root"
        class={ this.container ? bem() : bemItem() }
        container={ this.container }
        direction={ this.direction }
        wrap={ this.normalizedWrap }
        justify={ this.justify }
        align={ this.align }
        align-content={ this.alignContent }
        align-self={ this.alignSelf }
        order={ this.order }
        grow={ this.normalizedGrow }
        shrink={ this.shrink }
        basis={ this.normalizedBasis }
        gutter={ this.gutter }
        ellipsis={ this.ellipsis }
      >
        { this.$slots.default }
      </Root>
    )
  }

  get normalizedWrap (): string {
    if (this.wrap === true) {
      return 'wrap'
    }
    return this.wrap || 'nowrap'
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

  @Prop({ type: Boolean, default: false })
  container!: boolean

  @Prop({
    type: String,
    default: 'row',
    validator (val) {
      return ['row', 'row-reverse', 'column', 'column-reverse'].includes(val)
    },
  })
  direction!: string

  @Prop({
    type: [Boolean, String],
    default: 'nowrap',
  })
  wrap!: boolean | string

  @Prop({
    type: String,
    default: 'flex-start',
    validator (val) {
      return ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'].includes(val)
    },
  })
  justify!: FlexJustify

  @Prop({
    type: String,
    default: 'stretch',
    validator (val) {
      return ['flex-start', 'center', 'flex-end', 'baseline', 'stretch'].includes(val)
    },
  })
  align!: FlexAlign

  @Prop({
    type: String,
    default: 'stretch',
    validator (val) {
      return ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'].includes(val)
    },
  })
  alignContent!: FlexContent

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
      return ['auto', 'flex-start', 'center', 'flex-end', 'baseline', 'stretch'].includes(val)
    },
  })
  alignSelf!: FlexAlignSelf

  @Prop({ type: String, default: '0px' })
  gutter!: string

  // 过长省略
  // 可以理解为预设值, 关联 grow, basis
  // 建议不要和 width 混合使用, 因为 width 会覆盖 basis
  @Prop({ type: [Boolean, Number], default: false })
  ellipsis!: boolean | number
}
