import Collapse from './collapse'
import CollapseItem from './collapse-item'

Collapse.install = function (Vue) {
    Vue.component(Collapse.registName, Collapse)
}
CollapseItem.install = function (Vue) {
    Vue.component(CollapseItem.registName, CollapseItem)
}
Collapse.item = CollapseItem

export default Collapse
