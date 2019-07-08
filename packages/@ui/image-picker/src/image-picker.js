import Vue from 'vue'
import ComponentInput from './image-picker.vue'

const CTX = '$$ImagePicker'

const defaults = {
    multiple: false,
    max: Infinity,
    disabled: false,
    onload: (dataURI) => console.log('image-picker onload: ', dataURI),
    onerror: (error) => console.error('image-picker error: ', error && error.message),
}

const ConstructorInput = Vue.extend(ComponentInput)

export default {
    name: 'ImagePicker',

    inserted (el, binding) {
        const stylePosition = getComputedStyle(el).getPropertyValue('position')
        if (!stylePosition || stylePosition === 'static') {
            console.warn('[@huteming/ui Warn][image-picker]元素定位异常: ', stylePosition)
        }

        if (typeof binding.value === 'function') {
            binding.value = {
                onload: binding.value
            }
        }
        const options = Object.assign({}, defaults, binding.value || {})

        const instance = new ConstructorInput({
            el: document.createElement('div'),
            propsData: options,
            data () {
                return {
                    max: options.max,
                    disabled: options.disabled,
                }
            },
        })

        el.appendChild(instance.$el)

        el[CTX] = {
            options,
            instance,
        }
    },

    componentUpdated (el, binding) {
        const { instance } = el[CTX]

        instance.max = binding.value && binding.value.max
        instance.disabled = binding.value && binding.value.disabled
    },

    unbind (el) {
        const { instance } = el[CTX]

        el.removeChild(instance.$el)
    },
}
