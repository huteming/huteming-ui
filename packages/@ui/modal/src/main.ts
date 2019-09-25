import Vue from 'vue'
import Component from './modal.vue'
import zindexManager from 'web/assets/js/zindex-manager'
const ModalConstructor = Vue.extend(Component)

let currentInstance: any = null
const renderedInstanceData: any = [] // 渲染过的实例数据

export default {
    methods: {
        $_openModal (options: any, brotherElement: any) {
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

            const instance: any = new ModalConstructor({
                data: {},
            })

            const parent = brotherElement ? brotherElement.parentNode : document.body
            parent.appendChild(instance.$mount().$el)

            instance.setData(Object.assign({ zIndex: zindexManager.zIndex }, options))
            instance.show()

            // 保持只渲染一个
            currentInstance = instance

            return instance
        },
        $_closeModal (options: any) {
            const prev = renderedInstanceData.pop()
            if (prev) {
                currentInstance.setData(prev)
            } else if (currentInstance) {
                currentInstance.hide(options)
                currentInstance = null
            }
        },
    },
}
