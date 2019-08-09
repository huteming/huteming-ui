import 'web-ui/theme/index.js'

import _Actionsheet from 'web-ui/actionsheet/index.js'
import _Anchor from 'web-ui/anchor/index.js'
import _BtnPay from 'web-ui/btn-pay/index.js'
import _Carousel from 'web-ui/carousel/index.js'
import _CarouselItem from 'web-ui/carousel-item/index.js'
import _Cell from 'web-ui/cell/index'
import _Clocker from 'web-ui/clocker/index.js'
import _Dialog from 'web-ui/dialog/index.js'
import _Empty from 'web-ui/empty/index'
import _Field from 'web-ui/field/index'
import _Flex from 'web-ui/flex/index'
import _FlexItem from 'web-ui/flex-item/index'
import _Icon from 'web-ui/icon/index'
import _Image from 'web-ui/image/index'
import _ImagePicker from 'web-ui/image-picker/index'
import _InfiniteScroll from 'web-ui/infinite-scroll/index'
import _Loading from 'web-ui/loading/index'
import _Message from 'web-ui/message/index'
import _Panel from 'web-ui/panel/index'
import _Picker from 'web-ui/picker/index'
import _PickerItem from 'web-ui/picker-item/index'
import _PickerAddress from 'web-ui/picker-address/index'
import _PickerDatetime from 'web-ui/picker-datetime/index'
import _PickerRange from 'web-ui/picker-range/index'
import _Popup from 'web-ui/popup/index'
import _SmartScroll from 'web-ui/smart-scroll/index'
import _Toast from 'web-ui/toast/index.js'
import _Toolbar from 'web-ui/toolbar/index.js'
import _Collapse from 'web-ui/collapse/index'
import _CollapseItem from 'web-ui/collapse-item/index'
import _Guide from 'web-ui/guide/index'
import _NoticeBar from 'web-ui/notice-bar/index'
import _Mp3 from 'web-ui/mp3/index'
import _Mp4 from 'web-ui/mp4/index'
import _TransitionCollapse from 'web-ui/transition-collapse/index'

function install (Vue, config = {}) {
    Vue.use(_Actionsheet)
    Vue.use(_Clocker)
    Vue.use(_Cell)
    Vue.use(_Empty)
    Vue.use(_Field)
    Vue.use(_Flex)
    Vue.use(_FlexItem)
    Vue.use(_Icon)
    Vue.use(_Image)
    Vue.use(_ImagePicker)
    Vue.use(_Loading)
    Vue.use(_Picker)
    Vue.use(_PickerItem)
    Vue.use(_PickerRange)
    Vue.use(_PickerAddress)
    Vue.use(_PickerDatetime)
    Vue.use(_Popup)
    Vue.use(_BtnPay)
    Vue.use(_Dialog)
    Vue.use(_Panel)
    Vue.use(_Carousel)
    Vue.use(_CarouselItem)
    Vue.use(_SmartScroll)
    Vue.use(_InfiniteScroll)
    Vue.use(_Anchor)
    Vue.use(_Toolbar)
    Vue.use(_Message)
    Vue.use(_Toast)
    Vue.use(_Collapse)
    Vue.use(_CollapseItem)
    Vue.use(_NoticeBar)
    Vue.use(_Mp3)
    Vue.use(_Mp4)
    Vue.use(_TransitionCollapse)
}

export default {
    install,
}

export const Actionsheet = _Actionsheet
export const TmClocker = _Clocker
export const Message = _Message
export const Toast = _Toast
export const TmCell = _Cell
export const TmEmpty = _Empty
export const TmField = _Field
export const TmFlex = _Flex
export const TmFlexItem = _FlexItem
export const TmIcon = _Icon
export const TmImage = _Image
export const ImagePicker = _ImagePicker
export const Loading = _Loading
export const TmPicker = _Picker
export const TmPickerItem = _PickerItem
export const TmPickerRange = _PickerRange
export const TmPopup = _Popup
export const TmPickerAddress = _PickerAddress
export const TmPickerDatetime = _PickerDatetime
export const SmartScroll = _SmartScroll
export const InfiniteScroll = _InfiniteScroll
export const Anchor = _Anchor
export const TmToolbar = _Toolbar
export const TmBtnPay = _BtnPay
export const TmDialog = _Dialog
export const TmPanel = _Panel
export const TmCarousel = _Carousel
export const TmCarouselItem = _CarouselItem
export const TmCollapse = _Collapse
export const TmCollapseItem = _CollapseItem
export const TmGuide = _Guide
export const TmNoticeBar = _NoticeBar
export const TmMp3 = _Mp3
export const TmMp4 = _Mp4
export const TmTransitionCollapse = _TransitionCollapse
