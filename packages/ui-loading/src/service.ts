import { formatConfig, open, close, destroy } from './utils'
import { LoadingOptions } from '../types'

export default {
  open (el: HTMLElement, options?: LoadingOptions) {
    const config = formatConfig(options)

    return open(el, config)
  },

  close (el: HTMLElement, options?: LoadingOptions) {
    const config = formatConfig(options)

    return close(el, config)
  },

  destroy (el: HTMLElement) {
    destroy(el)
  },
}
