import Component from './src/app.vue'

Component.install = function (Vue) {
    Vue.component(Component.name, Component)
}

export default Component
