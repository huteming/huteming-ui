
import Vue from 'vue'
import Component from './modal.vue'
import zindexManager from 'web/assets/js/zindex-manager'

const ModalConstructor = Vue.extend(Component)

export default {
    /**
     * @param {Number} id
     * @param {Object} instance
     */
    _instances: [],

    open (id, options, brotherElement) {
        const one = this._instances.find(item => item.id === id)
        if (one) {
            one.instance.setZIndex(zindexManager.zIndex)
            return one.instance
        }

        const instance = new ModalConstructor({
            data: {},
        })

        const node = brotherElement ? brotherElement.parentNode : document.body
        node.appendChild(instance.$mount().$el)

        instance.setZIndex(zindexManager.zIndex)

        // Vue.nextTick(() => {
        instance.show(options)

        this._instances.push({
            id,
            instance,
        })
        // })

        return instance
    },

    close (id, options) {
        const index = this._instances.findIndex(item => item.id === id)

        if (index > -1) {
            const one = this._instances[index]
            one.instance.hide(options)

            this._instances.splice(index, 1)
        }
    },
}
