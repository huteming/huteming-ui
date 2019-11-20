import { Vue } from 'vue-property-decorator'
import TmModal from './modal'
import { CreateModal, OpenModal, ModalOptions, clickModal, ComponentModal, CloseModal } from '../types'

const ConstructorModal = Vue.extend(TmModal)
let currentInstance: ComponentModal | null = null// 单例
const renderedInstanceData: any = [] // 渲染过的实例数据

export const createModal: CreateModal = function (brotherElement?: Element) {
    if (currentInstance) {
        return currentInstance
    }

    currentInstance = new ConstructorModal()
    const parent = (brotherElement && brotherElement.parentNode) || document.body

    parent.appendChild(currentInstance.$mount().$el)

    return currentInstance
}

export const openModal: OpenModal = function (options?: ModalOptions | clickModal, brotherElement?: Element) {
    if (typeof options === 'function') {
        options = {
            callbackClick: options
        }
    }
    const config = Object.assign({}, options)

    // 没有实例则自动创建; 存在实例则保存实例属性
    if (!currentInstance) {
        currentInstance = createModal(brotherElement)
    } else {
        renderedInstanceData.push(currentInstance.$data)
    }

    currentInstance.show(config)

    return currentInstance
}

export const closeModal: CloseModal = function (options?: ModalOptions) {
    if (!currentInstance) return
    const prev = renderedInstanceData.pop()

    if (renderedInstanceData.length) {
        currentInstance.show(prev)
        return
    }

    currentInstance.hide(options)
    currentInstance = null
}
