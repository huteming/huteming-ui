import ModalComponent from './modal'
import zindexManager from 'ui/utils/zindex-manager'
import { Vue, Component } from 'vue-property-decorator'
import { ModalMixin, ModalComp } from './declare/types'
const ModalConstructor = Vue.extend(ModalComponent)

let currentInstance: any = null
const renderedInstanceData: any = [] // 渲染过的实例数据

@Component
export default class MixinModal extends Vue implements ModalMixin {
    // eslint-disable-next-line
    $_openModal (options?: object, brotherElement?: Element): ModalComp {
        if (typeof options === 'function') {
            options = {
                callbackClick: options
            }
        }

        if (currentInstance && document.querySelector('.tm-modal')) {
            // 保存旧的实例属性
            renderedInstanceData.push(Object.assign({}, currentInstance.$data))
            // 设置新的属性
            currentInstance.setData(Object.assign({ zIndex: zindexManager.zIndex }, options))
            return currentInstance
        }

        const instance: ModalComp = new ModalConstructor({
            data: {},
        })

        const parent = (brotherElement && brotherElement.parentNode) || document.body
        parent.appendChild(instance.$mount().$el)

        instance.setData(Object.assign({ zIndex: zindexManager.zIndex }, options))
        instance.show()

        // 保持只渲染一个
        currentInstance = instance

        return instance
    }

    // eslint-disable-next-line
    $_closeModal (options?: object) {
        const prev = renderedInstanceData.pop()
        if (prev) {
            currentInstance.setData(prev)
        } else if (currentInstance) {
            currentInstance.hide(options)
            currentInstance = null
        }
    }
}
