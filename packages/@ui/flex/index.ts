import _Flex from './src/flex.vue'
import _FlexItem from 'web-ui/flex-item/index'

(_Flex as any).install = (Vue: any) => {
    Vue.component(_Flex.name, _Flex)
}
(_Flex as any).item = _FlexItem

export const TmFlex = _Flex
export const TmFlexItem = _FlexItem

export default _Flex
