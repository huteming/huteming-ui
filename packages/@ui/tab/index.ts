import _Tab from './src/tab.vue'

(_Tab as any).install = function (Vue: any) {
    Vue.component(_Tab.name, _Tab)
}

export default _Tab
