import _TabPane from 'web-ui/tab/src/tab-pane.vue'

_TabPane.install = function (Vue) {
    Vue.component(_TabPane.name, _TabPane)
}

export default _TabPane
