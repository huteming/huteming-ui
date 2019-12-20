import Loading from './directive'
import Vue from 'vue'

export default Object.assign(Loading, {
  install (vue: typeof Vue) {
    vue.prototype.$loading = Loading
    vue.directive(Loading.registName, Loading)
  },
})
