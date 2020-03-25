import { Vue, Prop } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import TmIcon from '@huteming/ui-icon/src/main'
import { Root, Text } from './work'
const bem = createBEM('button')

@DescribedComponent({
  name: 'Button',
})
export default class Button extends Vue {
  render () {
    const DomIcon = (() => {
      const icon = this.loading ? 'loading' : this.icon
      return icon && <TmIcon icon={ icon } />
    })()
    const DomText = (() => {
      if (this.loading) {
        return this.loadingText && <Text class={ bem('text') } has-icon>{ this.loadingText }</Text>
      }
      const content = this.$slots.default || this.text
      if (content) {
        return <Text class={ bem('text') } has-icon={ !!this.icon }>{ content }</Text>
      }
    })()

    return (
      <Root
        class={ bem() }
        type={ this.type }
        size={ this.size }
        shape={ this.shape }
        disabled={ this.disabled }
        loading={ this.loading }
        block={ this.block }
        plain={ this.plain }
        on-click={ this.handleClick }>
        { DomIcon }
        { DomText }
      </Root>
    )
  }

  handleClick (event: Event) {
    this.$emit('click', event)
  }

  @Prop({
    type: String,
    default: 'default',
    validator (val) {
      return ['default', 'primary', 'info', 'warning', 'danger'].includes(val)
    },
  })
  type!: string

  @Prop({ type: String, default: '' })
  text!: string

  @Prop({
    type: String,
    default: 'normal',
    validator (val) {
      return ['normal', 'large', 'small', 'mini'].includes(val)
    },
  })
  size!: string

  @Prop({ type: String })
  icon?: string

  @Prop({ type: Boolean, default: false })
  block!: boolean

  @Prop({ type: Boolean, default: false })
  plain!: boolean

  @Prop({ type: String, default: '' })
  shape!: string

  @Prop({ type: Boolean, default: false })
  disabled!: boolean

  @Prop({ type: Boolean, default: false })
  loading!: boolean

  @Prop({ type: String, default: '' })
  loadingText!: string
}
