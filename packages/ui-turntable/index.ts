import Component from './src/app'

Component.install = function (Vue) {
    Vue.component(Component.registName, Component)
}

export default Component
