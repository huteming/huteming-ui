import Component from './src/clocker.vue'

Component.install = function (Vue) {
    Vue.component(Component.name, Component)
}

export default Component
