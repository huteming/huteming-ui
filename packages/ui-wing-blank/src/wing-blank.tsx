import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { Root } from './vars'
const bem = createBEM('wing')

@DescribedComponent({
  name: 'WingBlank',
})
export default class WingBlank extends Vue {
  render () {
    return (
      <Root class={ bem() } style={ this.styles } size={ this.size }>
        { this.$slots.default }
      </Root>
    )
  }

  @Prop({
    type: String,
    default: 'md',
  })
  size!: string

  get styles () {
    const { size } = this
    const isPreset = ['xs', 'sm', 'md', 'lg', 'xl'].includes(size)
    if (isPreset) return {}

    return {
      'padding-left': size,
      'padding-right': size,
    }
  }
}
