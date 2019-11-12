import Component from 'packages/ui-flex/src/flex-item'

Component.install = (Vue) => {
    Vue.component(Component.name, Component)
}

export default Component
