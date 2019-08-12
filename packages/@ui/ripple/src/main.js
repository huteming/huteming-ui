import Vue from 'vue'
import container from './container.vue'

const CTX = '@@Ripple'
const Container = Vue.extend(container)

const defaults = {
    color: 'rgb(255, 255, 255)',
    opacity: 0.3,
    center: false,
    disabled: false,
}

export default {
    name: 'Ripple',

    inserted (el, binding, vnode) {
        const custom = Object.assign({}, defaults)
        // const parentStyle = getComputedStyle(el)
        // const [, red, yellow, blue, opacity] = parentStyle.getPropertyValue('background-color').match(/rgba?\((\d*),\s?(\d*),\s?(\d*),?\s?(\d*)?\)/)
        // const parentOpacity = parentStyle.getPropertyValue('opacity')
        // const isColorWhite = red === '255' && yellow === '255' && blue === '255'
        // if (isColorWhite || opacity === '0' || parentOpacity === '0') {
        //     custom.color = 'rgb(0, 0, 0)'
        // }

        const options = Object.assign(custom, binding.value || {})

        const instance = new Container({
            el: document.createElement('div'),
            data () {
                return options
            },
        })

        el.appendChild(instance.$el)

        el[CTX] = {
            instance,
            options,
        }
    },

    componentUpdated (el, binding) {
        const { instance } = el[CTX]

        const disabled = binding.value && binding.value.disabled
        if (typeof disabled === 'boolean') {
            instance.disabled = disabled
        }
    },

    unbind (el) {
        const { instance } = el[CTX]

        el.removeChild(instance.$el)
    },
}
