import Component from './popup'

Component.install = function (Vue) {
    Vue.component(Component.registName, Component)
}

export default Component
