import Component from './src/mp3.vue'

(Component as any).install = (Vue: any) => {
    Vue.component(Component.name, Component)
}

export default Component
