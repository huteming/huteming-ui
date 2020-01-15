import Scroll from './smart-scroll'
import { SmartScroll } from '../types'
import Vue from 'vue'

export default <SmartScroll>{
  install (vue: typeof Vue) {
    vue.directive(Scroll.registName, Scroll)
  },
  ...Scroll,
}
