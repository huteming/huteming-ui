// 如果是按需引入，不会用到这个文件: https://www.npmjs.com/package/babel-plugin-transform-imports
const ENV = process.env.NODE_ENV
if (
    ENV !== 'production' &&
    ENV !== 'test' &&
    typeof console !== 'undefined' &&
    console.warn &&
    typeof window !== 'undefined'
) {
    console.warn(
        '当前你引入了整个 huteming-ui, ' +
        '建议通过使用 https://www.npmjs.com/package/babel-plugin-transform-imports 按需加载缩小体积'
    )
}

export { default as Actionsheet } from 'web-ui/actionsheet/index'
export { default as Message } from 'web-ui/message/index'
export { default as Toast } from 'web-ui/toast/index'
export { default as Guide } from 'web-ui/guide/index'

export { default as Anchor } from 'web-ui/anchor/index'
export { default as ImagePicker } from 'web-ui/image-picker/index'
export { default as InfiniteScroll } from 'web-ui/infinite-scroll/index'
export { default as Loading } from 'web-ui/loading/index'
export { default as SmartScroll } from 'web-ui/smart-scroll/index'
export { default as Ripple } from 'web-ui/ripple/index'

export { default as TmTransitionCollapse } from 'web-ui/transition-collapse/index'

export { default as TmBtnPay } from 'web-ui/btn-pay/index'
export { default as TmCarousel } from 'web-ui/carousel/index'
export { default as TmCarouselItem } from 'web-ui/carousel-item/index'
export { default as TmCell } from 'web-ui/cell/index'
export { default as TmClocker } from 'web-ui/clocker/index'
export { default as TmDialog } from 'web-ui/dialog/index'
export { default as TmEmpty } from 'web-ui/empty/index'
export { default as TmField } from 'web-ui/field/index'
export { default as TmFlex } from 'web-ui/flex/index'
export { default as TmFlexItem } from 'web-ui/flex-item/index'
export { default as TmIcon } from 'web-ui/icon/index'
export { default as TmImage } from 'web-ui/image/index'
export { default as TmPanel } from 'web-ui/panel/index'
export { default as TmPicker } from 'web-ui/picker/index'
export { default as TmPickerItem } from 'web-ui/picker-item/index'
export { default as TmPickerAddress } from 'web-ui/picker-address/index'
export { default as TmPickerDatetime } from 'web-ui/picker-datetime/index'
export { default as TmPickerRange } from 'web-ui/picker-range/index'
export { default as TmPopup } from 'web-ui/popup/index'
export { default as TmToolbar } from 'web-ui/toolbar/index.js'
export { default as TmCollapse } from 'web-ui/collapse/index'
export { default as TmCollapseItem } from 'web-ui/collapse-item/index'
export { default as TmNoticeBar } from 'web-ui/notice-bar/index'
export { default as TmMp3 } from 'web-ui/mp3/index'
export { default as TmMp4 } from 'web-ui/mp4/index'
export { default as TmWingBlank } from 'web-ui/wing-blank/index'
export { default as TmWhiteSpace } from 'web-ui/white-space/index'
