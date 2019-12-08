import Flex from './flex'
import FlexItem from './flex-item'

Flex.install = (Vue) => {
    Vue.component(Flex.registName, Flex)
}
FlexItem.install = (Vue) => {
    Vue.component(FlexItem.registName, FlexItem)
}
Flex.item = FlexItem

export default Flex
