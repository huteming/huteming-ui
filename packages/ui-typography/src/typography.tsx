import { DescribedComponent, VuePreset, createBEM } from 'packages/ui-styles/src/main'
import { Prop } from 'vue-property-decorator'
import { Root } from './work'
const bem = createBEM('typography')

@DescribedComponent({
  name: 'TmTypography',
})
export default class Typography extends VuePreset {
  render () {
    return (
      <Root gutterBottom={ this.gutterBottom } variant={ this.variant } lines={ this.lines } class={ bem() }>{ this.$slots.default }</Root>
    )
  }

  /**
   * 字体类型
   * https://material.io/design/typography/the-type-system.html#applying-the-type-scale
   */
  @Prop({
    type: String,
    default: 'body1',
    validator (val) {
      return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline', 'inherit'].includes(val)
    },
  })
  variant!: string

  @Prop({ type: Boolean, default: false })
  gutterBottom!: boolean

  @Prop({ type: [Boolean, Number], default: false })
  lines!: boolean | number
}
