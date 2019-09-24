import Component from './src/app'

Component.install = function (Vue) {
    Vue.component(Component.name, Component)
}

export default Component
