import Empty from './empty'

Empty.install = function (Vue) {
    Vue.component(Empty.registName, Empty)
}

export default Empty
