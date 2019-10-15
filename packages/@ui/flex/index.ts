import _Flex from './src/flex'
import _FlexItem from 'web-ui/flex-item/index'

_Flex.install = (Vue) => {
    Vue.component(_Flex.name, _Flex)
}
_Flex.item = _FlexItem

export const TmFlex = _Flex
export const TmFlexItem = _FlexItem

export default _Flex
