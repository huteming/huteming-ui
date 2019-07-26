import _Collapse from './src/collapse'
import _CollapseItem from 'web-ui/collapse-item/index'

_Collapse.install = function (Vue) {
    Vue.component(_Collapse.name, _Collapse)
}
_Collapse.item = _CollapseItem

export const TmCollapse = _Collapse
export const TmCollapseItem = _CollapseItem

export default _Collapse
