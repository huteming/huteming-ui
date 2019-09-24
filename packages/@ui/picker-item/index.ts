import _PickerItem from 'web-ui/picker/src/picker-item.vue'

(_PickerItem as any).install = function (Vue: any) {
    Vue.component(_PickerItem.name, _PickerItem)
}

export default _PickerItem
