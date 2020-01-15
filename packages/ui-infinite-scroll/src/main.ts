import InfiniteScroll from './infinite-scroll'
import Vue from 'vue'

export default Object.assign(InfiniteScroll, {
  install (vue: typeof Vue) {
    vue.directive(InfiniteScroll.registName, InfiniteScroll)
  },
})
