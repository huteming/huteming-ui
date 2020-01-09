import MixinsModal from '@huteming/ui-modal/src/main'
import { isVNode, isComponent } from '@huteming/ui-tools/src/main'
import { Mixins, Prop, Vue } from 'vue-property-decorator'
import { BeforeClose, BeforeConfirm, BeforeCancel, MessageResponse, MessageType, ActionType, MessageComponent } from '../types'
import { CreateElement, VNode, ComponentOptions } from 'vue'
import { hairline, StyledComponent, DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import { StyleProps } from '@huteming/ui-styles/types'
const bem = createBEM('message')

const styles = (styled: any, css: any) => {
  return {
    Root: styled('div', (props: StyleProps) => `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      z-index: ${props.state.zIndex};
    `),
    Wrap: styled('div', () => `
      width: 315px;
      border-radius: 8px;
      overflow: hidden;
      background: #fff;
    `),
    Container: styled('div', () => `
      padding: 20px;
      display: flex;
      flex-flow: column wrap;
      align-items: center;
    `),
    Title: styled('div', () => `
      font-size: 18px;
      line-height: 25px;
      color: rgba(0, 0, 0, 1);
      font-weight: 400;
    `),
    Subtitle: styled('div', { isTop: Boolean }, (props: StyleProps) => css`
      margin-top: ${!props.isTop && '9px'};
      font-size: 16px;
      line-height: 24px;
      color: rgba(93, 93, 103, 1);
      font-weight: 400;
    `),
    Field: styled('div', { isTop: Boolean }, (props: StyleProps) => css`
      width: 100%;
      margin-top: ${!props.isTop && '9px'};
    `),
    FieldInput: styled('input', () => `
      width: 100%;
      padding: 11px 12px;
      color: #bbb;
      font-size: 14px;
      line-height: 14px;
      background: rgba(255,255,255,1);
      border-radius: 8px;
      border: 1px solid rgba(221,221,221,1);
      outline: none;
      appearance: none;
      -webkit-user-modify: read-write-plaintext-only;
      box-sizing: border-box;

      &::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        font-size: 14px;
        line-height: 1.4;
        color: #bbb;
      }
    `),
    Footer: styled('div', (props: StyleProps) => `
      position: relative;
      display: flex;
      align-items: center;
      ${hairline(props.theme, 'top', 'rgba(227, 227, 227, 1)')};
    `),
    FooterBtn: styled('div', { isCancel: Boolean, isConfirm: Boolean, isHighlight: Boolean }, (props: StyleProps) => css`
      flex: 1;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      line-height: 24px;
      font-weight: ${props.isHighlight && 'bold'};

      ${props.isCancel && `
        position: relative;
        color: rgba(32, 38, 49, 1);
        ${hairline(props.theme, 'right', 'rgba(227, 227, 227, 1)')};
      `}

      ${props.isConfirm && `
        color: rgba(58, 149, 250, 1);
      `}
    `),
  }
}

@DescribedComponent({
  name: 'TmMessage',
})
@StyledComponent(styles)
export default class Message extends Mixins(MixinsModal) implements MessageComponent {
  render (h: CreateElement) {
    const { Root, Wrap, Container, Title, Subtitle, Field, FieldInput, Footer, FooterBtn } = this.styledComponents
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
      <transition name="zoom-in" on-after-leave={ this.handleAfterLeave }>
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
      </transition>
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
