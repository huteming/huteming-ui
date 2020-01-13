import { DirectiveBinding } from 'vue/types/options'
import { open, close, formatConfig, destroy } from './utils'

export default {
  bind (el: HTMLElement, binding: DirectiveBinding) {
    const config = formatConfig(binding.value)

    // 首次绑定指令时，如果就是loading状态，则不需要动画
    // 动画存在过渡时间，界面看起来会"闪屏"
    config.loading && open(el, Object.assign({}, config, { openAnimation: false }))
  },

  update (el: HTMLElement, binding: DirectiveBinding) {
    const config = formatConfig(binding.value)
    const old = formatConfig(binding.oldValue)

    /* istanbul ignore else */
    if (config.loading !== old.loading) {
      config.loading ? open(el, config) : close(el, config)
    }
  },

  unbind (el: HTMLElement) {
    destroy(el)
  },
}
