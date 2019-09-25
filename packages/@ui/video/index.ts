import Component from './src/app.vue'

(Component as any).install = function (Vue: any) {
    Vue.component(Component.name, Component)
}

export default Component
