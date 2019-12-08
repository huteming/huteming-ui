import Component from './notice-bar'

Component.install = function (Vue) {
    Vue.component(Component.registName, Component)
}

export default Component
