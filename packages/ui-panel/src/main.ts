import Component from './panel'

Component.install = function (Vue) {
  Vue.component(Component.registName, Component)
}

export default Component
