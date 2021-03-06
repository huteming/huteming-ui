import { AnchorAttr } from 'packages/ui-anchor/types'
import { ImagePickerScope } from 'packages/ui-image-picker/types'
import { LoadingScope } from 'packages/ui-loading/types'
import { VueConstructor } from 'vue'

declare global {
  interface Window {
    Vue?: VueConstructor
    WeixinJSBridge: {
      invoke: (arg0: string, arg1: object, arg2: (arg0: { err_msg: string }) => void) => void,
    },
    wx: {
      getLocation: (arg0: { type: string, success: (arg0: { latitude: number, longitude: number }) => void, fail: (arg0: { errMsg: string }) => void }) => void,
      showMenuItems: (arg0: { menuList: string[] }) => void,
      hideMenuItems: (arg0: { menuList: string[] }) => void,
      onMenuShareAppMessage: (arg0: object) => void,
      onMenuShareTimeline: (arg0: object) => void,
      ready: (arg0: () => void) => void,
      error: (arg0: (arg0: { errMsg: string }) => void) => void,
      config: (a: object) => void,
    },
    __wxjs_is_wkwebview: boolean,
    definedAjaxing: any,
    definedToast: any,
    definedPrompt: any,
  }

  interface HTMLElement {
    '@@Anchor'?: AnchorAttr
    '$$ImagePicker'?: ImagePickerScope
    '@@Loading'?: LoadingScope
  }
}

export {}
