import Component from './src/mp3'

Component.install = (Vue) => {
    Vue.component(Component.name, Component)
}

export default Component
