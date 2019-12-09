import Vue from 'vue'
import ComponentInput from './image-input'
import { getStyle } from '@huteming/ui-element/src/main'
const CTX = '$$ImagePicker'

const defaults = {
    multiple: false,
    max: Infinity,
    disabled: false,
    // onload: (dataURI: any) => console.log('image-picker onload: ', dataURI),
    // onerror: (error: any) => console.error('image-picker error: ', error && error.message),
}

const ConstructorInput = Vue.extend(ComponentInput)

export default {
    registName: 'ImagePicker',

    inserted (el: any, binding: any) {
        const stylePosition = getStyle(el, 'position')
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
            propsData: options,
        })

        el.appendChild(instance.$mount().$el)

        el[CTX] = {
            options,
            instance,
        }
    },

    componentUpdated (el: any, binding: any) {
        const { instance } = el[CTX]

        instance.max = binding.value && binding.value.max
        instance.disabled = binding.value && binding.value.disabled
    },

    unbind (el: any) {
        const { instance } = el[CTX]

        el.removeChild(instance.$el)
    },
}
