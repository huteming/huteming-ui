import _Collapse from './src/collapse.vue'
import _CollapseItem from 'web-ui/collapse-item/index'

(_Collapse as any).install = function (Vue: any) {
    Vue.component(_Collapse.name, _Collapse)
}
// (_Collapse as any).item = _CollapseItem

export const TmCollapse = _Collapse
export const TmCollapseItem = _CollapseItem

export default _Collapse
