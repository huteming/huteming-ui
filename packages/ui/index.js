import _Clocker from 'web-ui/clocker/index.js'
import _Message from 'web-ui/message/index.js'
import _Toast from 'web-ui/toast/index.js'

import _PickerAddress from 'web-ui/picker-address/index.js'
import _PickerDatetime from 'web-ui/picker-datetime/index.js'

import _InfiniteScroll from 'web-ui/infinite-scroll/index.js'
import _Anchor from 'web-ui/anchor/index.js'

import _BtnPay from 'web-ui/btn-pay/index.js'
import _Dialog from 'web-ui/dialog/index.js'
import _Panel from 'web-ui/panel/index.js'
import _Carousel from 'web-ui/carousel/index.js'
import _CarouselItem from 'web-ui/carousel-item/index.js'

function install (Vue, config = {}) {
    Vue.component(_Clocker.name, _Clocker)

    Vue.component(_PickerAddress.name, _PickerAddress)
    Vue.component(_PickerDatetime.name, _PickerDatetime)

    Vue.component(_BtnPay.name, _BtnPay)
    Vue.component(_Dialog.name, _Dialog)
    Vue.component(_Panel.name, _Panel)
    Vue.component(_Carousel.name, _Carousel)
    Vue.component(_CarouselItem.name, _CarouselItem)

    Vue.directive(_InfiniteScroll.name, _InfiniteScroll)
    Vue.directive(_Anchor.name, _Anchor)

    Vue.use(_Message)
    Vue.use(_Toast)
}

export default {
    install,
}

export const TmClocker = _Clocker
export const Message = _Message
export const Toast = _Toast

export const TmPickerAddress = _PickerAddress
export const TmPickerDatetime = _PickerDatetime

export const InfiniteScroll = _InfiniteScroll
export const Anchor = _Anchor

export const TmBtnPay = _BtnPay
export const TmDialog = _Dialog
export const TmPanel = _Panel
export const TmCarousel = _Carousel
export const TmCarouselItem = _CarouselItem
