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

export function formatConfig (value?: boolean | LoadingOptions): LoadingOptions {
  if (!(value instanceof Object)) {
    value = {
      loading: !!value,
    }
  }
  return Object.assign({}, defaults, value)
}

export function create (config: LoadingOptions): LoadingComp {
  const instance: LoadingComp = new ConstructorLoading({
    el: document.createElement('div'),
    data: {
      ...config,
    },
  })
  return instance
}

export function update (instance: LoadingComp, config: LoadingOptions): LoadingComp {
  for (let key in config) {
    if (key in defaults) {
      (instance as any)[key] = (config as any)[key]
    }
  }
  return instance
}

export function check (el: HTMLElement) {
  const scope = el[SCOPE]
  const instance = scope && scope.instance
  return instance
}

export function installScope (el: HTMLElement, config: LoadingOptions): LoadingComp {
  const oldInstance = check(el)

  if (oldInstance) {
    return update(oldInstance, config)
  }

  const instance = create(config)
  el.appendChild(instance.$el)
  el[SCOPE] = {
    instance,
  }
  return instance
}

export function uninstallScope (el: HTMLElement): LoadingComp | null | undefined {
  const instance = check(el)
  el[SCOPE] = undefined

  /* istanbul ignore else */
  if (instance) {
    instance.$destroy()
    instance.$el.parentNode && instance.$el.parentNode.removeChild(instance.$el)
  }

  return instance
}

export function open (el: HTMLElement, config: LoadingOptions): LoadingComp {
  const instance = installScope(el, config)
  instance.loading = true

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
  const instance = check(el)

  if (!instance) {
    return null
  }

  instance.loading = false
  instance.hide()

  return instance
}

export function destroy (el: HTMLElement) {
  uninstallScope(el)
}
