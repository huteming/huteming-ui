import Vue from 'vue'
import actionsheet from 'packages/ui-actionsheet/src/main'
import message from 'packages/ui-message/src/main'
import toast from 'packages/ui-toast/src/main'
import guide from 'packages/ui-guide/src/main'
import anchor from 'packages/ui-anchor/src/main'
import imagePicker from 'packages/ui-image-picker/src/main'
import InfiniteScroll from 'packages/ui-infinite-scroll/src/main'
import loading from 'packages/ui-loading/src/main'
import SmartScroll from 'packages/ui-smart-scroll/src/main'
// export { default as Ripple } from 'web-ui/ripple/index'
import btnPay from 'packages/ui-btn-pay/src/main'
import carousel from 'packages/ui-carousel/src/main'
import cell from 'packages/ui-cell/src/main'
import clocker from 'packages/ui-clocker/src/main'
import dialog from 'packages/ui-dialog/src/main'
import empty from 'packages/ui-empty/src/main'
import Field from 'packages/ui-field/src/main'
import flex from 'packages/ui-flex/src/main'
import icon from 'packages/ui-icon/src/main'
import Image from 'packages/ui-image/src/main'
import Panel from 'packages/ui-panel/src/main'
import Picker from 'packages/ui-picker/src/main'
import PickerAddress from 'packages/ui-picker-address/src/main'
import PickerDatetime from 'packages/ui-picker-datetime/src/main'
import PickerRange from 'packages/ui-picker-range/src/main'
import popup from 'packages/ui-popup/src/main'
import toolbar from 'packages/ui-toolbar/src/main'
import Collapse from 'packages/ui-collapse/src/main'
import NoticeBar from 'packages/ui-notice-bar/src/main'
import wingBlank from 'packages/ui-wing-blank/src/main'
import whiteSpace from 'packages/ui-white-space/src/main'
import Switch from 'packages/ui-switch/src/main'
import Button from 'packages/ui-button/src/main'
import Range from 'packages/ui-range/src/main'
import Card from 'packages/ui-card/src/main'
import Typography from 'packages/ui-typography/src/main'
import tag from 'packages/ui-tag/src/main'

import * as Animation from 'packages/ui-animation/src/main'
import * as Api from 'packages/ui-api/src/main'
import * as iWxsdk from 'packages/ui-wxsdk/src/main'
import { ThemeProvider } from 'packages/ui-styles/src/main'

import TransitionSlide from 'packages/ui-transition-slide/src/main'
import TransitionFade from 'packages/ui-transition-fade/src/main'

import pack from '../package.json'

const components = [
  tag,
  actionsheet,
  anchor,
  btnPay,
  carousel,
  cell,
  Button,
  icon,
  clocker,
  message,
  Collapse,
  dialog,
  Image,
  PickerDatetime,
  wingBlank,
  whiteSpace,
  Switch,
  imagePicker,
  Field,
  toast,
  PickerAddress,
  empty,
  flex,
  guide,
  InfiniteScroll,
  loading,
  NoticeBar,
  Picker,
  PickerRange,
  popup,
  Range,
  SmartScroll,
  toolbar,
  Card,
  Panel,
  TransitionSlide,
  TransitionFade,
  Typography,
]

function install (vue: typeof Vue, config = {}) {
  vue.prototype.$HUTEMING = {
    ...(vue.prototype.$HUTEMING || {}),
    ...config,
  }

  Object.values(components).forEach(item => vue.use(item))

  vue.component('ThemeProvider', ThemeProvider)
  vue.use(Picker.item)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: pack.version,
  install,
  ThemeProvider,
  ...components,
}

export const api = Api
export const animation = Animation
export const wxsdk = iWxsdk
export { default as CanvasDraw } from 'packages/ui-canvas-draw/src/main'
export { default as Request, onRequest, onResponse, onResponseError, getOptions } from 'packages/ui-request/src/main'

export { createTheme } from 'packages/ui-styles/src/main'

export const Flex = flex
export const Tag = tag
export const Actionsheet = actionsheet
export const Message = message
export const Toast = toast
export const Guide = guide
export const Anchor = anchor
export const BtnPay = btnPay
export const Carousel = carousel
export const Cell = cell
export const Clocker = clocker
export const Dialog = dialog
export const Empty = empty
export const WhiteSpace = whiteSpace
export const WingBlank = wingBlank
export const Icon = icon
export const Loading = loading
export const Popup = popup
export const Toolbar = toolbar
export const ImagePicker = imagePicker
