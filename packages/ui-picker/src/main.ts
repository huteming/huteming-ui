import Picker from './picker'
import PickerItem from './picker-item'

Picker.install = function (Vue) {
    Vue.component(Picker.registName, Picker)
}
PickerItem.install = function (Vue) {
    Vue.component(PickerItem.registName, PickerItem)
}
Picker.item = PickerItem

export default Picker
