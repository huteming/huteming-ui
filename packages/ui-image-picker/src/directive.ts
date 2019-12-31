import Vue from 'vue'
import ComponentInput from './image-input'
import { getStyle } from '@huteming/ui-element/src/main'
import { ImagePickerInput, ImagePickerOptions } from '../types'
import { DirectiveBinding } from 'vue/types/options'
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

  inserted (el: HTMLElement, binding: DirectiveBinding) {
    const stylePosition = getStyle(el, 'position')
    if (!stylePosition || stylePosition === 'static') {
      console.warn('[@huteming/ui Warn][image-picker]元素定位异常: ', stylePosition)
    }
    let value: ImagePickerOptions = binding.value || {}

    if (typeof value === 'function') {
      value = {
        onload: value,
      }
    }
    const options = Object.assign({}, defaults, value)
    const instance: ImagePickerInput = new ConstructorInput({
      propsData: options,
      data () {
        return {
          disabled: options.disabled,
          max: options.max,
        }
      },
    })

    el.appendChild(instance.$mount().$el)

    el[CTX] = {
      options,
      instance,
    }
  },

  componentUpdated (el: HTMLElement, binding: DirectiveBinding) {
    const scope = el[CTX]
    const value = binding.value
    /* istanbul ignore if */
    if (!scope || !value || typeof value === 'function') return
    const { instance } = scope

    instance.max = value.max
    instance.disabled = value.disabled
  },

  unbind (el: HTMLElement) {
    const scope = el[CTX]
    /* istanbul ignore if */
    if (!scope) return
    const { instance } = scope

    el.removeChild(instance.$el)
  },
}
