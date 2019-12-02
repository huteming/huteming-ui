import Vue from 'vue'
// export { default as TmTurntable } from 'web-ui/turntable/index'
import Actionsheet from 'packages/ui-actionsheet/src/main'
// export { default as Message } from 'web-ui/message/index'
// export { default as Toast } from 'web-ui/toast/index'
// export { default as Guide } from 'web-ui/guide/index'

import Anchor from 'packages/ui-anchor/src/main'
// export { default as ImagePicker } from 'web-ui/image-picker/index'
// export { default as InfiniteScroll } from 'web-ui/infinite-scroll/index'
// export { default as Loading } from 'web-ui/loading/index'
// export { default as SmartScroll } from 'web-ui/smart-scroll/index'
// export { default as Ripple } from 'web-ui/ripple/index'

// export { default as TmTransitionCollapse } from 'web-ui/transition-collapse/index'

import BtnPay from 'packages/ui-btn-pay/src/main'
import Carousel from 'packages/ui-carousel/src/main'
import CarouselItem from 'packages/ui-carousel-item/src/main'
import Cell from 'packages/ui-cell/src/main'
// export { default as TmClocker } from 'web-ui/clocker/index'
// export { default as TmDialog } from 'web-ui/dialog/index'
// export { default as TmEmpty } from 'web-ui/empty/index'
// export { default as TmField } from 'web-ui/field/index'
// export { default as TmFlex } from '@ui/packages/flex/index'
// export { default as TmFlexItem } from '@ui/packages/flex-item/index'
import Icon from 'packages/ui-icon/src/main'
// export { default as TmImage } from 'web-ui/image/index'
// export { default as TmPanel } from 'web-ui/panel/index'
// export { default as TmPicker } from 'web-ui/picker/index'
// export { default as TmPickerItem } from 'web-ui/picker-item/index'
// export { default as TmPickerAddress } from 'web-ui/picker-address/index'
// export { default as TmPickerDatetime } from 'web-ui/picker-datetime/index'
// export { default as TmPickerRange } from 'web-ui/picker-range/index'
// export { default as TmPopup } from 'web-ui/popup/index'
// export { default as TmToolbar } from 'web-ui/toolbar/index'
// export { default as TmCollapse } from 'web-ui/collapse/index'
// export { default as TmCollapseItem } from 'web-ui/collapse-item/index'
// export { default as TmNoticeBar } from 'web-ui/notice-bar/index'
// export { default as TmWingBlank } from 'web-ui/wing-blank/index'
// export { default as TmWhiteSpace } from 'web-ui/white-space/index'
// export { default as TmAudioPlayer } from 'web-ui/audio-player/index'
// export { default as TmVideoPlayer } from 'web-ui/video-player/index'
// export { default as TmSwitch } from 'web-ui/switch/index'
import Button from 'packages/ui-button/src/main'

import * as Animation from 'packages/ui-animation/src/main'
import * as Api from 'packages/ui-api/src/main'
import CanvasDraw from 'packages/ui-canvas-draw/src/main'

const components = [
    Actionsheet,
    Anchor,
    BtnPay,
    Carousel,
    CarouselItem,
    Cell,
    Button,
    Icon,
]

function install (vue: typeof Vue, config = {}) {
    Object.values(components).forEach(item => vue.use(item))
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    Animation,
    Api,
    CanvasDraw,
    ...components,
}
