import Component from 'web-ui/collapse/src/collapse-item.vue'

(Component as any).install = function (Vue: any) {
    Vue.component(Component.name, Component)
}

export default Component
