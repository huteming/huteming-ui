import Directive from './directive'
import Service from './service'
import Vue from 'vue'

export default {
  ...Service,
  ...Directive,
  install (vue: typeof Vue) {
    vue.prototype.$loading = Service
    vue.directive('Loading', Directive)
  },
}
