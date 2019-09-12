import Component from './src/app'

Component.install = (Vue) => {
    Vue.component(Component.name, Component)
}

export default Component
