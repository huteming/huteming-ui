import _Picker from './src/picker.vue'

(_Picker as any).install = function (Vue: any) {
    Vue.component(_Picker.name, _Picker)
}

export default _Picker
