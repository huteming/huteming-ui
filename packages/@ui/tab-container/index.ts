import _TabContainer from 'web-ui/tab/src/tab-container.vue'

(_TabContainer as any).install = function (Vue: any) {
    Vue.component(_TabContainer.name, _TabContainer)
}

export default _TabContainer
