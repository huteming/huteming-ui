import MixinsModal from '@huteming/ui-modal/src/main'
import { isVNode, isComponent } from '@huteming/ui-tools/src/main'
import { Mixins, Prop, Vue } from 'vue-property-decorator'
import { BeforeClose, BeforeConfirm, BeforeCancel, MessageResponse, MessageType, ActionType, MessageComponent } from '../types'
import { CreateElement, VNode, ComponentOptions } from 'vue'
import { DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import TransitionZoom from 'packages/transition-zoom/src/main'
import { Root, Wrap, Container, Title, Subtitle, Field, FieldInput, Footer, FooterBtn } from './vars'
const bem = createBEM('message')

@DescribedComponent({
  name: 'Message',
})
export default class Message extends Mixins(MixinsModal) implements MessageComponent {
  render (h: CreateElement) {
    const domTitle = (() => {
      if (this.title) {
        return <Title class={ bem('title') }>{ this.title }</Title>
      }
    })()
    const domSubtitle = (() => {
      if (this.message === '') return
      let html

      if (isVNode(this.message)) {
        html = this.message as VNode
      } else if (isComponent(this.message)) {
        html = h(this.message as ComponentOptions<Vue>)
      } else {
        html = h('p', {
          domProps: {
            innerHTML: this.message,
          },
        })
      }

      return <Subtitle ref="subtitle" class={ bem('subtitle') } is-top={ !domTitle }>{ html }</Subtitle>
    })()
    const domField = (() => {
      if (this.showInput) {
        return <Field class={ bem('field') } is-top={ !domTitle && !domSubtitle }>
          <FieldInput class={ bem('input') }
            type={ this.inputType }
            value={ this.normalizedInputValue }
            on-input={ this.handleInput }
            placeholder={ this.inputPlaceholder }
            autofocus />
        </Field>
      }
    })()
    const domCancel = (() => {
      if (this.showCancelButton) {
        return <FooterBtn ref="cancel" class={ bem('cancel') } is-cancel is-highlight={ this.cancelButtonHighlight } onClick={ this.handleCancel }>
          <span>{ this.cancelButtonText }</span>
        </FooterBtn>
      }
    })()

    return (
      <TransitionZoom on-after-leave={ this.handleAfterLeave }>
        <Root class={ bem() } v-show={ this.visible } ref="msgbox" on-click={ this.handleClickModal }>
          <Wrap>
            <Container class={ bem('container') }>
              { domTitle }
              { domSubtitle }
              { domField }
            </Container>

            <Footer class={ bem('footer') }>
              { domCancel }

              <FooterBtn ref="confirm" class={ bem('confirm') } is-confirm is-highlight={ this.confirmButtonHighlight } onClick={ this.handleConfirm }>
                <span>{ this.confirmButtonText }</span>
              </FooterBtn>
            </Footer>
          </Wrap>
        </Root>
      </TransitionZoom>
    )
  }

  get messageType (): MessageType {
    const { showCancelButton, showInput } = this

    if (showInput) {
      return 'prompt'
    } else if (showCancelButton) {
      return 'confirm'
    }
    return 'alert'
  }

  handleAfterLeave () {
    const { action } = this.res
    const _callback = (() => {
      if (this.messageType === 'alert') {
        return this.resolve
      }
      return action === 'confirm' ? this.resolve : this.reject
    })()
    _callback(this.res)
    this.destroyElement()
  }

  handleInput (value: any) {
    this.normalizedInputValue = value
  }

  handleClickModal (event: Event) {
    // .stop
    event.stopPropagation()
    // .self
    if (event.target !== event.currentTarget) return

    if (this.messageType !== 'alert' && this.closeOnClickModal) {
      this.handleCancel()
    }
  }

  // handleTouchmove (event: Event) {
  //   // .stop
  //   event.stopPropagation()
  //   // .prevent
  //   event.preventDefault()
  // }

  handleConfirm () {
    this.hide('confirm')
  }

  handleCancel () {
    this.hide('cancel')
  }

  show () {
    this.openModal()
    this.visible = true
  }

  hide (action: ActionType) {
    this.res = {
      action,
      inputValue: this.normalizedInputValue,
      // 如果导出 且 在sentry环境下：
      // 上报异常时，会出现找不到 nativeEvent 等属性错误。
      // 不上报会出现堆栈溢出无限报错
      // vm: this,
    }
    const _beforeAction = action === 'confirm' ? this.beforeConfirm : this.beforeCancel

    const done = () => {
      this.closeModal()
      this.visible = false
    }
    const _beforeClose = () => {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(done, this.res)
      } else {
        done()
      }
    }

    if (typeof _beforeAction === 'function') {
      _beforeAction(_beforeClose, this.res)
    } else {
      _beforeClose()
    }
  }

  destroyElement (): void {
    this.$destroy()
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }

  // 提示框的标题
  @Prop({ type: String, default: '提示' })
  title!: string

  @Prop({ type: [String, Object], default: '' })
  message!: string | VNode | ComponentOptions<Vue>

  // 确认按钮的文本
  @Prop({ type: String, default: '确定' })
  confirmButtonText!: string

  // 是否将确认按钮的文本加粗显示
  @Prop({ type: Boolean, default: false })
  confirmButtonHighlight!: boolean

  // 是否显示取消按钮
  @Prop({ type: Boolean, default: false })
  showCancelButton!: boolean

  // 取消按钮的文本
  @Prop({ type: String, default: '取消' })
  cancelButtonText!: string

  // 是否将取消按钮的文本加粗显示
  @Prop({ type: Boolean, default: false })
  cancelButtonHighlight!: boolean

  // 是否显示一个输入框
  @Prop({ type: Boolean, default: false })
  showInput!: boolean

  // 输入框的类型
  @Prop({ type: String, default: 'text' })
  inputType!: string

  // 输入框的值
  @Prop({ type: String, default: '' })
  inputValue!: string

  // 输入框的占位符
  @Prop({ type: String, default: '请输入' })
  inputPlaceholder!: string

  // 是否在点击遮罩时关闭提示框(alert 为 false)
  // closeOnClickModal = true

  // 关闭前的回调，会暂停 message 的关闭。done 用于关闭 message
  @Prop({ type: Function })
  beforeClose?: BeforeClose
  @Prop({ type: Function })
  beforeConfirm?: BeforeConfirm
  @Prop({ type: Function })
  beforeCancel?: BeforeCancel

  visible = false
  normalizedInputValue = this.inputValue
  resolve!: Function
  reject!: Function
  res!: MessageResponse
}
