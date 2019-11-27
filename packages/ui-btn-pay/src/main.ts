import Component from './btn-pay'

Component.install = (Vue) => {
    Vue.component(Component.registName, Component)
}

export default Component
