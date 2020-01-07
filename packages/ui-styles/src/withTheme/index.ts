import { Theme } from '../../types'
import themeButton from './button'
import themeColor from './color'
import themeFont from './font'
import themeTag from './tag'
import { deepmerge, isStandardBrowserEnv } from '@huteming/ui-tools/src/main'

function scaleDpr (): number {
  if (!isStandardBrowserEnv()) {
    return 1
  }
  const ua = navigator.userAgent
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i)
  const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
  if (!isIos && !(matches && Number(matches[1]) > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    return 1
  }
  return window.devicePixelRatio || 1
}

const defaultModal = {
  background: 'rgba(0, 0, 0, .5)',
}

const defaults: Theme = {
  dpr: scaleDpr(),
  modal: defaultModal,
  button: themeButton,
  color: themeColor,
  font: themeFont,
  tag: themeTag,
}

function withTheme (options = {}): Theme {
  return deepmerge(defaults, options)
}

export default withTheme
