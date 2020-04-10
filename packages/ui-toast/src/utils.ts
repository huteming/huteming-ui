import Vue, { VNode, ComponentOptions } from 'vue'
import ComponentToast from './toast'
import { ToastOptions, ToastComponent, ExpandMap, ExpandHandler } from '../types'
import { isVNode, isComponent } from 'packages/ui-tools/src/main'

const ToastConstructor = Vue.extend(ComponentToast)
let instance: ToastComponent | null = null

const open = function (options: ToastOptions): ToastComponent {
  if (instance) {
    instance.close()
  }

  instance = new ToastConstructor({
    propsData: options,
  })
  document.body.appendChild(instance.$mount().$el)

  instance.open()

  return instance
}

const expandMethods: ExpandMap = {
  success: {
    icon: 'success_circle_outline',
  },
  error: {
    icon: 'error_circle_outline',
  },
  warning: {
    icon: 'warning_circle_outline',
  },
  loading: {
    icon: 'loading',
    duration: 0,
  },
}

const Toast = function (message: string | ToastOptions | VNode | ComponentOptions<Vue>, duration: number | ToastOptions = 3000, options: ToastOptions = {}) {
  let config = Object.assign({}, options)

  if (isVNode(message) || isComponent(message)) { // VNode, Component
    config.message = message as VNode
  } else if (typeof message === 'object') { // ToastOptions
    config = Object.assign({}, message, config)
  } else { // string
    config.message = message
  }

  if (duration instanceof Object) {
    config = Object.assign({}, duration, config)
  } else {
    config = Object.assign({ duration }, config)
  }

  return open(config)
}

Object.keys(expandMethods).forEach((item: ExpandHandler) => {
  const preset = expandMethods[item];
  (Toast as any)[item] = (message: string | ToastOptions | VNode | ComponentOptions<Vue>, duration: number | ToastOptions, options: ToastOptions = {}) => {
    return Toast(message, duration, Object.assign({}, options, preset))
  }
})

export default Toast
