import Vue from 'vue'
import Actionsheet from 'packages/ui-actionsheet/src/main'
import Message from 'packages/ui-message/src/main'
import Toast from 'packages/ui-toast/src/main'
import Guide from 'packages/ui-guide/src/main'

import Anchor from 'packages/ui-anchor/src/main'
import ImagePicker from 'packages/ui-image-picker/src/main'
import InfiniteScroll from 'packages/ui-infinite-scroll/src/main'
import Loading from 'packages/ui-loading/src/main'
import SmartScroll from 'packages/ui-smart-scroll/src/main'
// export { default as Ripple } from 'web-ui/ripple/index'

// export { default as TmTransitionCollapse } from 'web-ui/transition-collapse/index'

import BtnPay from 'packages/ui-btn-pay/src/main'
import Carousel from 'packages/ui-carousel/src/main'
import CarouselItem from 'packages/ui-carousel-item/src/main'
import Cell from 'packages/ui-cell/src/main'
import Clocker from 'packages/ui-clocker/src/main'
import Dialog from 'packages/ui-dialog/src/main'
import Empty from 'packages/ui-empty/src/main'
import Field from 'packages/ui-field/src/main'
import Flex from 'packages/ui-flex/src/main'
import Icon from 'packages/ui-icon/src/main'
import Image from 'packages/ui-image/src/main'
import Panel from 'packages/ui-panel/src/main'
import Picker from 'packages/ui-picker/src/main'
import PickerAddress from 'packages/ui-picker-address/src/main'
import PickerDatetime from 'packages/ui-picker-datetime/src/main'
import PickerRange from 'packages/ui-picker-range/src/main'
import Popup from 'packages/ui-popup/src/main'
import Toolbar from 'packages/ui-toolbar/src/main'
import Collapse from 'packages/ui-collapse/src/main'
import NoticeBar from 'packages/ui-notice-bar/src/main'
import WingBlank from 'packages/ui-wing-blank/src/main'
import WhiteSpace from 'packages/ui-white-space/src/main'
import Switch from 'packages/ui-switch/src/main'
import Button from 'packages/ui-button/src/main'
import Range from 'packages/ui-range/src/main'
import Card from 'packages/ui-card/src/main'
import Typography from 'packages/ui-typography/src/main'

import * as animation from 'packages/ui-animation/src/main'
import * as api from 'packages/ui-api/src/main'
import * as iWxsdk from 'packages/ui-wxsdk/src/main'
import { ThemeProvider } from 'packages/ui-styles/src/main'

import TransitionSlide from 'packages/ui-transition-slide/src/main'
import TransitionFade from 'packages/ui-transition-fade/src/main'

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
  Dialog,
  Image,
  PickerDatetime,
  WingBlank,
  WhiteSpace,
  Switch,
  ImagePicker,
  Field,
  Toast,
  PickerAddress,
  Empty,
  Flex,
  Guide,
  InfiniteScroll,
  Loading,
  NoticeBar,
  Picker,
  PickerRange,
  Popup,
  Range,
  SmartScroll,
  Toolbar,
  Card,
  Panel,
  TransitionSlide,
  TransitionFade,
  Typography,
]

function install (vue: typeof Vue, config = {}) {
  Object.values(components).forEach(item => vue.use(item))

  vue.component('ThemeProvider', ThemeProvider)
  vue.use(Collapse.item)
  vue.use(Picker.item)
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
export const wxsdk = iWxsdk
export { default as CanvasDraw } from 'packages/ui-canvas-draw/src/main'
export { default as Request, onRequest, onResponse, onResponseError, getOptions } from 'packages/ui-request/src/main'

export { createTheme } from 'packages/ui-styles/src/main'
