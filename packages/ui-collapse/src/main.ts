import Collapse from './collapse'
import CollapseItem from './collapse-item'
import { installComponent } from 'utils/tools'

const installWrap = installComponent('Collapse', Collapse)
const installItem = installComponent('CollapseItem', CollapseItem)

Collapse.install = function (Vue) {
  installWrap(Vue)
  installItem(Vue)
}
CollapseItem.install = installItem
Collapse.item = CollapseItem

export default Collapse
