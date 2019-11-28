import Component from './cell'

Component.install = function (Vue) {
    Vue.component(Component.registName, Component)
}

export default Component
