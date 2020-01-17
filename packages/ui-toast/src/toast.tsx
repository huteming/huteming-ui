import { zIndex, DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import TmIcon from '@huteming/ui-icon/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { isVNode, isComponent } from '@huteming/ui-tools/src/main'
import { VNode, ComponentOptions, CreateElement } from 'vue'
import { Root, Icon, Text } from './work'
const bem = createBEM('toast')

@DescribedComponent({
  name: 'TmToast',
})
export default class Toast extends Vue {
  render (h: CreateElement) {
    const domMessage = (() => {
      if (!this.message) return
      let html

      if (isVNode(this.message)) {
        html = this.message
      } else if (isComponent(this.message)) {
        html = h(this.message as ComponentOptions<Vue>)
      } else {
        html = h('p', {
          domProps: {
            innerHTML: this.message,
          },
        })
      }

      return <Text class={ bem('text') }>{ html }</Text>
    })()
    return (
      <transition name="fade" on-after-leave={ this.handleAfterLeave } ref="transition">
        <Root class={ bem() } v-show={ this.visible } position={ this.position } z-index={ this.zIndex }>
          { domMessage }
          { this.icon && <Icon class={ bem('icon') } has-text={ !!domMessage }><TmIcon icon={ this.icon } /></Icon> }
        </Root>
      </transition>
    )
  }

  @Prop({ type: [String, Object], default: '' })
  message!: string | VNode | ComponentOptions<Vue>

  @Prop({ type: String, default: '' })
  icon!: string

  @Prop({
    type: String,
    default: 'middle',
    validator (val) {
      return ['top', 'middle', 'bottom'].indexOf(val) > -1
    },
  })
  position!: string

  @Prop({ type: Number, default: 3000 })
  duration!: number

  @Prop({ type: Function })
  onClose: Function | undefined

  visible = false
  zIndex = '1000'

  mounted () {
    if (this.duration > 0) {
      setTimeout(this.close, this.duration)
    }
  }

  handleAfterLeave () {
    this.destroyElement()
  }
  open () {
    this.zIndex = zIndex()
    this.visible = true
  }
  close () {
    if (typeof this.onClose === 'function') {
      this.onClose()
    }

    this.visible = false
  }
  destroyElement () {
    this.$destroy()
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }
}
