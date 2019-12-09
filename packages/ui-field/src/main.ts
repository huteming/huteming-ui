import Component from './field'

Component.install = function (Vue) {
    Vue.component(Component.registName, Component)
}

export default Component
