import Vue, { RenderContext, VueConstructor } from 'vue'

export { parse, stringify } from 'qs'

export function installComponent (name: string, component: VueConstructor) {
  return function (vue: typeof Vue) {
    const scope = (vue.prototype.$HUTEMING || {}).scopeComponent || 'Tm'
    vue.component(`${scope}${name}`, component)
  }
}

export function mergeListeners (context: RenderContext, eventName: string, animate: Function) {
  const output: Function[] = [animate]
  const listeners = context.listeners[eventName]
  if (listeners) {
    if (Array.isArray(listeners)) {
      output.push(...listeners)
    } else {
      output.push(listeners)
    }
  }
  return output
}

export function log (...args: any[]) {
  if (process.env.NODE_ENV !== 'test') {
    console.log('@huteming Logger [Log]:', ...args)
  }
}

/**
 * 判断运行环境
 * https://github.com/axios/axios/blob/13c948e661f4a077bbc788dcb9d3c2c1b403d010/lib/utils.js
 */
export function isStandardBrowserEnv () {
  // if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
  //                                          navigator.product === 'NativeScript' ||
  //                                          navigator.product === 'NS')) {
  //     return false
  // }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  )
}
