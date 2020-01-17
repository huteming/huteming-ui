import { DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { Root, Title, Action } from './work'
const bem = createBEM('toolbar')

@DescribedComponent({
  name: 'TmToolbar',
  inheritAttrs: false,
})
export default class Toolbar extends Vue {
  render () {
    return (
      <Root class={ bem() }>
        <Action class={ bem('cancel') } type="cancel" on-click={ this.handleCancel }>
          <span>{ this.cancelText }</span>
        </Action>

        <Title class={ bem('title') }>{ this.title }</Title>

        <Action class={ bem('confirm') } type="confirm" on-click={ this.handleConfirm }>
          {
            this.showConfirm && <span>{ this.confirmText }</span>
          }
        </Action>
      </Root>
    )
  }

  @Prop({ type: String, default: '' })
  title!: string

  // 确定按钮文本
  @Prop({ type: String, default: '确定' })
  confirmText!: string

  @Prop({ type: Boolean, default: true })
  showConfirm!: boolean

  // 取消按钮文本
  @Prop({ type: String, default: '取消' })
  cancelText!: string

  handleConfirm (event: Event) {
    event.stopPropagation()
    if (!this.showConfirm) {
      return false
    }
    this.$emit('confirm')
  }
  handleCancel (event: Event) {
    event.stopPropagation()
    this.$emit('cancel')
  }
}
