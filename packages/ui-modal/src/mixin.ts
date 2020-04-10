import { Vue, Component, Prop } from 'vue-property-decorator'
import { ModalMixin, ModalComponent, ModalOptions, clickModal } from '../types'
import TmModal from './modal'
import { zIndex } from 'packages/ui-styles/src/main'

@Component({
  name: 'MixinModal',
})
export default class Modal extends Vue implements ModalMixin {
  @Prop({ type: Boolean, default: true })
  closeOnClickModal!: boolean

  private instance: ModalComponent | null = null

  createModal () {
    if (this.instance) {
      return this.instance
    }

    const ConstructorModal = Vue.extend(TmModal)
    this.instance = new ConstructorModal()
    const parent = this.$el.parentNode || document.body

    parent.appendChild(this.instance.$mount().$el)

    return this.instance
  }

  openModal (options: ModalOptions | clickModal = {}) {
    if (typeof options === 'function') {
      options = {
        click: options,
      }
    }
    const config = Object.assign({}, options)

    // 没有实例则自动创建; 存在实例则保存实例属性
    if (!this.instance) {
      this.instance = this.createModal()
    }

    this.instance.show(config)
    const instance = this.instance.$el as HTMLElement
    const brother = this.$el as HTMLElement
    instance.style.zIndex = zIndex()
    brother.style.zIndex = zIndex()

    return this.instance
  }

  closeModal (options: ModalOptions = {}) {
    if (!this.instance) return
    return this.instance.hide(options)
  }
}
