import Component from './src/dialog.vue'

Component.install = function (Vue) {
    Vue.component(Component.name, Component)
}

export default Component
