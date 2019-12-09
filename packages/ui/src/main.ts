import Vue from 'vue'
// export { default as TmTurntable } from 'web-ui/turntable/index'
import Actionsheet from 'packages/ui-actionsheet/src/main'
import Message from 'packages/ui-message/src/main'
import Toast from 'packages/ui-toast/src/main'
// export { default as Guide } from 'web-ui/guide/index'

import Anchor from 'packages/ui-anchor/src/main'
import ImagePicker from 'packages/ui-image-picker/src/main'
// export { default as InfiniteScroll } from 'web-ui/infinite-scroll/index'
// export { default as Loading } from 'web-ui/loading/index'
// export { default as SmartScroll } from 'web-ui/smart-scroll/index'
// export { default as Ripple } from 'web-ui/ripple/index'

// export { default as TmTransitionCollapse } from 'web-ui/transition-collapse/index'

import BtnPay from 'packages/ui-btn-pay/src/main'
import Carousel from 'packages/ui-carousel/src/main'
import CarouselItem from 'packages/ui-carousel-item/src/main'
import Cell from 'packages/ui-cell/src/main'
import Clocker from 'packages/ui-clocker/src/main'
import Dialog from 'packages/ui-dialog/src/main'
// export { default as TmEmpty } from 'web-ui/empty/index'
import Field from 'packages/ui-field/src/main'
// export { default as TmFlex } from '@ui/packages/flex/index'
// export { default as TmFlexItem } from '@ui/packages/flex-item/index'
import Icon from 'packages/ui-icon/src/main'
import Image from 'packages/ui-image/src/main'
// export { default as TmPanel } from 'web-ui/panel/index'
// export { default as TmPicker } from 'web-ui/picker/index'
// export { default as TmPickerItem } from 'web-ui/picker-item/index'
// export { default as TmPickerAddress } from 'web-ui/picker-address/index'
import PickerDatetime from 'packages/ui-picker-datetime/src/main'
// export { default as TmPickerRange } from 'web-ui/picker-range/index'
// export { default as TmPopup } from 'web-ui/popup/index'
// export { default as TmToolbar } from 'web-ui/toolbar/index'
import Collapse from 'packages/ui-collapse/src/main'
import CollapseItem from 'packages/ui-collapse-item/src/main'
// export { default as TmNoticeBar } from 'web-ui/notice-bar/index'
import WingBlank from 'packages/ui-wing-blank/src/main'
import WhiteSpace from 'packages/ui-white-space/src/main'
// export { default as TmAudioPlayer } from 'web-ui/audio-player/index'
// export { default as TmVideoPlayer } from 'web-ui/video-player/index'
import Switch from 'packages/ui-switch/src/main'
import Button from 'packages/ui-button/src/main'

import * as animation from 'packages/ui-animation/src/main'
import * as api from 'packages/ui-api/src/main'
import canvasDraw from 'packages/ui-canvas-draw/src/main'
import { ThemeProvider } from 'packages/ui-styles/src/main'

const components = [
    Actionsheet,
    Anchor,
    BtnPay,
    Carousel,
    CarouselItem,
    Cell,
    Button,
    Icon,
    Clocker,
    Message,
    Collapse,
    CollapseItem,
    Dialog,
    Image,
    PickerDatetime,
    WingBlank,
    WhiteSpace,
    Switch,
    ImagePicker,
    Field,
    Toast,
]

function install (vue: typeof Vue, config = {}) {
    Object.values(components).forEach(item => vue.use(item))

    vue.component('ThemeProvider', ThemeProvider)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    ThemeProvider,
    ...components,
}

export const Api = api
export const Animation = animation
export const CanvasDraw = canvasDraw
export { createTheme } from 'packages/ui-styles/src/main'
