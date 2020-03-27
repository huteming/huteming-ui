
import { Vue, Prop } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { Root } from './vars'
const bem = createBEM('white')

@DescribedComponent({
  name: 'WhiteSpace',
})
export default class WhiteSpace extends Vue {
  render () {
    return (
      <Root class={ bem() } size={ this.size } style={ this.styles }>
        { this.$slots.default }
      </Root>
    )
  }

  @Prop({ type: String, default: 'md' })
  size!: string

  get styles () {
    const { size } = this
    const isPreset = ['xs', 'sm', 'md', 'lg', 'xl'].includes(this.size)
    if (isPreset) return {}

    return {
      height: size,
    }
  }
}
