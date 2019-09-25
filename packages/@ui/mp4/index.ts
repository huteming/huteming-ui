import Component from './src/app.vue'

(Component as any).install = (Vue: any) => {
    Vue.component(Component.name, Component)
}

export default Component
