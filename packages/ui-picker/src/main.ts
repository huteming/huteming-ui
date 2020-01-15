import Picker from './picker'
import PickerItem from './picker-item'
import { installComponent } from 'utils/tools'

const installWrap = installComponent('Picker', Picker)
const installItem = installComponent('PickerItem', PickerItem)

Picker.install = (Vue) => {
  installWrap(Vue)
  installItem(Vue)
}
PickerItem.install = installItem
Picker.item = PickerItem

export default Picker
