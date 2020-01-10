import { formatConfig, open, close, uninstallScope } from './utils'
import { LoadingOptions } from '../types'

export default {
  open (el: HTMLElement, options: boolean | LoadingOptions) {
    const config = formatConfig(options)

    return open(el, config)
  },

  close (el: HTMLElement, options: boolean | LoadingOptions) {
    const config = formatConfig(options)

    return close(el, config)
  },

  restore (el: HTMLElement) {
    uninstallScope(el)
  },
}
