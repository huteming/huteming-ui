import Component from './src/app'

Component.install = (Vue) => {
    Vue.component(Component.registName, Component)
}

export default Component
