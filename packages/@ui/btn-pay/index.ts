import Component from './src/btn-pay.vue'

(Component as any).install = (Vue: any) => {
    Vue.component(Component.name, Component)
}

export default Component
