import Component from './toolbar'

Component.install = function (Vue) {
    Vue.component(Component.registName, Component)
}

export default Component
