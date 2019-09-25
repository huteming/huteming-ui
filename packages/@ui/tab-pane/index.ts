import _TabPane from 'web-ui/tab/src/tab-pane.vue'

(_TabPane as any).install = function (Vue: any) {
    Vue.component(_TabPane.name, _TabPane)
}

export default _TabPane
