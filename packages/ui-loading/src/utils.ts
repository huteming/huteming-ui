import Vue from 'vue'
import CompLoading from './loading'
import { LoadingComp, LoadingOptions } from '../types'
const ConstructorLoading = Vue.extend(CompLoading)
const SCOPE = '@@Loading'
const defaults = {
  text: '',
  loading: false,
  openAnimation: true,
  theme: {},
}

/**
 * !!! loading属性在创建的时候已经定型，不会自动响应改变
 */
export function create (config: LoadingOptions): LoadingComp {
  const instance: LoadingComp = new ConstructorLoading({
    el: document.createElement('div'),
    data: {
      ...config,
    },
  })
  return instance
}

export function installScope (el: HTMLElement, config: LoadingOptions): LoadingComp {
  const scope = el[SCOPE]

  if (scope && scope.instance) {
    return scope.instance
  }
  const instance = create(config)
  el[SCOPE] = {
    instance,
  }
  return instance
}

export function uninstallScope (el: HTMLElement): LoadingComp | null | undefined {
  const scope = el[SCOPE]
  const exists = scope && scope.instance
  el[SCOPE] = undefined
  return exists
}

export function open (el: HTMLElement, config: LoadingOptions): LoadingComp {
  const instance = installScope(el, config)
  instance.loading = true

  el.appendChild(instance.$el)
  Vue.nextTick(() => {
    if (instance.loading) {
      instance.show()
    } else {
      instance.$emit('after-leave')
    }
  })

  return instance
}

export function close (el: HTMLElement, config: LoadingOptions): LoadingComp | null {
  const instance = uninstallScope(el)

  if (!instance) {
    return null
  }
  instance.loading = false
  instance.hide()

  return instance
}

export function formatConfig (value: boolean | LoadingOptions): LoadingOptions {
  if (!(value instanceof Object)) {
    value = {
      loading: !!value,
    }
  }
  return Object.assign({}, defaults, value)
}
