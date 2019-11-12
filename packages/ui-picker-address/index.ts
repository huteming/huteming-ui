import Component from './src/picker-address.vue'

(Component as any).install = function (Vue: any) {
    Vue.component(Component.name, Component)
}

export default Component
