import MixinsModal from '@huteming/ui-modal/src/main'
import { Prop, Mixins, Watch, Emit } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import TransitionFade from 'packages/ui-transition-fade/src/main'
import { Root, Content, Footer, CancelOutRight, CancelOutLeft, CancelInRight, CancelInLeft, CancelBottom, Line } from './work'
const bem = createBEM('dialog')

@DescribedComponent({
  name: 'Dialog',
})
export default class Dialog extends Mixins(MixinsModal) {
  render () {
    const DomFooter = (() => {
      if (this.$slots.footer) {
        return <Footer class={ bem('footer') }>{ this.$slots.footer }</Footer>
      }
    })()
    const DomCancelPosition = (() => {
      switch (this.closePosition) {
      case 'bottom':
        return CancelBottom
      case 'out-right':
        return CancelOutRight
      case 'out-left':
        return CancelOutLeft
      case 'in-right':
        return CancelInRight
      case 'in-left':
        return CancelInLeft
      default:
        return ''
      }
    })()
    const DomCancel = (() => {
      if (DomCancelPosition) {
        return (
          <DomCancelPosition class={ bem('cancel') } on-click={ this.handleClose }>
            <img src="https://jhsycdn.jinghao.com/components/icon-close.png" alt="" style="display: block; width: 100%;" />
            { this.closePosition === 'out-right' && <Line class={ bem('line') }></Line> }
          </DomCancelPosition>
        )
      }
    })()
    return (
      <TransitionFade on-after-leave={ this.handleAfterLeave }>
        <Root class={ bem() } v-show={ this.normalizedVisible } on-click={ this.handleStop }>
          <Content class={ bem('content') }>{ this.$slots.default }</Content>
          { DomFooter }
          { DomCancel }
        </Root>
      </TransitionFade>
    )
  }

  mounted () {
    if (this.visible) {
      this.show()
    }
  }

  @Watch('value')
  onValue (val: boolean) {
    this.visible = val
  }

  @Watch('visible')
  @Emit('input')
  onVisible (val: boolean) {
    val ? (this.show()) : (this.hide())
  }

  handleStop (event: Event) {
    event.stopPropagation()
  }

  show () {
    this.openModal({
      leaveToDestroy: false,
      click: this.handleClickModal,
    })
    this.normalizedVisible = true

    this.$emit('open')
  }

  hide () {
    const done = () => {
      this.closeModal()
      this.normalizedVisible = false

      this.$emit('close')
    }

    if (typeof this.beforeClose === 'function') {
      this.beforeClose(done)
    } else {
      done()
    }
  }

  handleClose () {
    this.visible = false
  }

  /**
   * 点击 modal 回调
   */
  handleClickModal () {
    if (this.closeOnClickModal) {
      this.visible = false
    }
  }

  /**
   * Dialog 关闭动画结束时的回调
   */
  handleAfterLeave () {
    this.$emit('closed')
  }

  /**
   * 可选值 out-right, out-left, in-right, in-left, bottom
   */
  @Prop({ type: String, default: 'bottom' })
  closePosition!: string

  @Prop({ type: Boolean, default: false })
  value!: boolean

  @Prop({ type: Function })
  beforeClose: Function | undefined

  @Prop({ type: Boolean, default: false })
  closeOnClickModal!: boolean

  visible: boolean = this.value
  normalizedVisible: boolean = false
}
