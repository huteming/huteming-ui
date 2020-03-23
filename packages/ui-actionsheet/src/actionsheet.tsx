import { Mixins, Prop } from 'vue-property-decorator'
import { ActionsheetMenu, ComponentActionsheet } from '../types/index'
import { DescribedComponent, createBEM } from '@huteming/ui-styles/src/main'
import MixinModal from '@huteming/ui-modal/src/main'
import TransitionSlide from '@huteming/ui-transition-slide/src/main'
import { Container, Header, Menu } from './work'
const bem = createBEM('actionsheet')

@DescribedComponent({
  name: 'Actionsheet',
})
export default class Actionsheet extends Mixins(MixinModal) implements ComponentActionsheet {
  render () {
    return (
      <TransitionSlide enterDirection="bottom" leaveDirection="bottom" on-after-leave={ this.handleAfterLeave }>
        <Container v-show={ this.visible } class={ bem() }>
          {
            this.title
              ? <Header class={ bem('title') }>{ this.title }</Header>
              : null
          }

          {
            this.normalizedMenu.map((item, index) => {
              return (
                <Menu
                  key={ item.value }
                  class={ item.label === this.cancelText ? bem('cancel') : bem('confirm') }
                  spacing={ item.label === this.cancelText }
                  border={ index > 0 && item.label !== this.cancelText }
                  on-click={ this.handleClickMenu.bind(this, item.value) }
                >
                  <span>{ item.label }</span>
                </Menu>
              )
            })
          }
        </Container>
      </TransitionSlide>
    )
  }

  get normalizedMenu (): ActionsheetMenu[] {
    const res = this.menus.concat()
    /* istanbul ignore else */
    if (this.cancelText) {
      res.push({
        label: this.cancelText,
        value: '',
      })
    }
    return res
  }

  handleClickMenu (actionValue: any) {
    this.close(actionValue)
  }

  handleClickModal () {
    if (this.closeOnClickModal) {
      this.close()
    }
  }

  handleAfterLeave () {
    this.destroyElement()
  }

  open () {
    this.openModal(this.handleClickModal)
    this.visible = true
  }

  close (actionValue?: any) {
    this.closeModal()
    this.visible = false

    actionValue ? this.resolve(actionValue) : this.reject()
  }

  destroyElement () {
    this.$destroy()
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }

  visible: boolean = false

  @Prop({ type: Function, default: () => Promise.resolve })
  resolve!: Function

  @Prop({ type: Function, default: () => Promise.resolve })
  reject!: Function

  @Prop({ type: String, default: '' })
  title!: string

  @Prop({ type: Array, default: () => ([]) })
  menus!: ActionsheetMenu[]

  @Prop({ type: String, default: '取消' })
  cancelText!: string

  @Prop({ type: Boolean, default: true })
  closeOnClickModal!: boolean
}
