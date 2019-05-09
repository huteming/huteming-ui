import _Clocker from 'web-ui/clocker/index.js'
import _Input from 'web-ui/input/index.js'
import _Popup from 'web-ui/popup/index.js'
import _Actionsheet from 'web-ui/actionsheet/index.js'
import _Message from 'web-ui/message/index.js'

import _PickerAddress from 'web-ui/picker-address/index.js'
import _PickerDatetime from 'web-ui/picker-datetime/index.js'
import _PickerRange from 'web-ui/picker-range/index.js'

import _Flex from 'web-ui/flex/index.js'
import _FlexItem from 'web-ui/flex-item/index.js'

import _Tab from 'web-ui/tab/index.js'
import _TabPane from 'web-ui/tab-pane/index.js'
import _TabContainer from 'web-ui/tab-container/index.js'

import _Carousel from 'web-ui/carousel/index.js'
import _CarouselItem from 'web-ui/carousel-item/index.js'

import _Picker from 'web-ui/picker/index.js'
import _PickerItem from 'web-ui/picker-item/index.js'

import _InfiniteScroll from 'web-ui/infinite-scroll/index.js'

function install (Vue, config = {}) {
    Vue.component(_Clocker.name, _Clocker)
    Vue.component(_Flex.name, _Flex)
    Vue.component(_FlexItem.name, _FlexItem)
    Vue.component(_Input.name, _Input)
    Vue.component(_Popup.name, _Popup)

    Vue.component(_PickerAddress.name, _PickerAddress)
    Vue.component(_PickerDatetime.name, _PickerDatetime)
    Vue.component(_PickerRange.name, _PickerRange)

    Vue.component(_Tab.name, _Tab)
    Vue.component(_TabContainer.name, _TabContainer)
    Vue.component(_TabPane.name, _TabPane)

    Vue.component(_Carousel.name, _Carousel)
    Vue.component(_CarouselItem.name, _CarouselItem)

    Vue.component(_Picker.name, _Picker)
    Vue.component(_PickerItem.name, _PickerItem)

    Vue.directive(_InfiniteScroll.name, _InfiniteScroll)

    Vue.use(_Actionsheet)
    Vue.use(_Message)
}

export default {
    install,
}

export const TmClocker = _Clocker
export const Input = _Input
export const Popup = _Popup
export const Actionsheet = _Actionsheet
export const Message = _Message

export const TmPickerAddress = _PickerAddress
export const PickerDatetime = _PickerDatetime
export const PickerRange = _PickerRange

export const Flex = _Flex
export const FlexItem = _FlexItem

export const Tab = _Tab
export const TabContainer = _TabContainer
export const TabPane = _TabPane

export const Carousel = _Carousel
export const CarouselItem = _CarouselItem

export const Picker = _Picker
export const PickerItem = _PickerItem

export const InfiniteScroll = _InfiniteScroll
