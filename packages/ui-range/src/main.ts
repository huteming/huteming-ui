import Component from './range'

Component.install = function (Vue) {
    Vue.component(Component.registName, Component)
}

export default Component
