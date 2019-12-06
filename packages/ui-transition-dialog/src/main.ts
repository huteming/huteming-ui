import TransitionCollapse from './transition-dialog'

TransitionCollapse.install = function (Vue) {
    Vue.component(TransitionCollapse.registName, TransitionCollapse)
}

export default TransitionCollapse
