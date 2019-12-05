import TransitionCollapse from './transition-collapse'

TransitionCollapse.install = function (Vue) {
    Vue.component(TransitionCollapse.registName, TransitionCollapse)
}

export default TransitionCollapse
