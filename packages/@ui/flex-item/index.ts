import Component from 'web-ui/flex/src/flex-item.vue'

(Component as any).install = (Vue: any) => {
    Vue.component(Component.name, Component)
}

export default Component
