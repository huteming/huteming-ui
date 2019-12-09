import Component from './switch'

Component.install = function (Vue) {
    Vue.component(Component.registName, Component)
}

export default Component
