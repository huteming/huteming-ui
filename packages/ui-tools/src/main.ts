// var u = navigator.userAgent
// app = navigator.appVersion;
// trident: u.indexOf('Trident') > -1, //IE内核
// presto: u.indexOf('Presto') > -1, //opera内核
// webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
// gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
// mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
// ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
// android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
// iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
// iPad: u.indexOf('iPad') > -1, //是否iPad
// webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
// weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
// qq: u.match(/\sQQ/i) == " qq" //是否QQ
const IMG_SUFFIX = 'tommy'

/**
 * 判断运行环境
 * https://github.com/axios/axios/blob/13c948e661f4a077bbc788dcb9d3c2c1b403d010/lib/utils.js
 */
export function isStandardBrowserEnv () {
  // if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
  //                                          navigator.product === 'NativeScript' ||
  //                                          navigator.product === 'NS')) {
  //     return false
  // }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  )
}

export function generateId () {
  return Math.floor(Math.random() * 100000)
}

/**
 * 时间格式转为时间戳
 */
export function toTimestamp (time: number | string | Date, defaults: number = 0): number {
  // 不存在
  if (!time) {
    return defaults
  }

  // 时间字符串
  if (typeof time === 'string') {
    return Number(new Date(time.replace(/-/g, '/')))
  }

  // 时间戳
  if (typeof time === 'number') {
    return time
  }

  // 时间对象
  return Number(time)
}

export function isObject (item: any) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function deepmerge (target: any, source: any, options = { clone: true }) {
  const output = options.clone ? { ...target } : target

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key]) && key in target) {
        output[key] = deepmerge(target[key], source[key], options)
      } else {
        output[key] = source[key]
      }
    })
  }

  return output
}

export function isVNode (node: any): boolean {
  return node !== null && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, 'componentOptions')
}

export function isComponent (node: any): boolean {
  return node !== null && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, 'render')
}

// 首字母大写
export function firstToUppercase (str: string): string {
  return str.toLowerCase().replace(/^\S/g, L => L.toUpperCase())
}

// 监听微信事件
export function linkWeixinBridge () {
  return new Promise((resolve, reject) => {
    if (window.WeixinJSBridge) {
      window.WeixinJSBridge.invoke('getNetworkType', {}, resolve)
    } else {
      document.addEventListener('WeixinJSBridgeReady', function () {
        window.WeixinJSBridge.invoke('getNetworkType', {}, resolve)
      }, false)
    }
  })
}

export function retry (fn: Function, count: number = 1): Function {
  let args: any
  let self: object
  // this: any => https://github.com/Microsoft/TypeScript/issues/16016
  return async function handler (this: any): Promise<any> {
    args = arguments
    self = this
    try {
      const res = await fn.apply(self, args)
      return res
    } catch (err) {
      if (count <= 0) {
        throw err
      }
      count--
      try {
        const res = await handler.apply(self, args)
        return res
      } catch (err) {
        throw err
      }
    }
  }
}

/**
 * 判断 webview 是 WKWebview, 只在微信浏览器中有效
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/iOS_WKWebview.html
 */
export function isWKWebview () {
  return !!window.__wxjs_is_wkwebview
}

export async function sleep (time: number) {
  await new Promise((resolve) => setTimeout(resolve, time))
}

/**
 * 是否IOS终端
 */
export function isIOS () {
  const userAgent = window.navigator.userAgent
  return !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

/**
 * 是否安卓终端
 */
export function isAndroid () {
  const userAgent = window.navigator.userAgent
  return userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1
}

/**
 * 是否微信内
 */
export function isWeixinBrowser () {
  return /micromessenger/.test(window.navigator.userAgent.toLowerCase())
}

/**
 * 数字之前补0
 * @param {Number|String} value 数据
 * @param {Number} fractionDigits 小数点前保留位数
 */
export function tofilled (value: any, fractionDigits = 0) {
  const allowType = new Set(['string', 'number'])
  if (!allowType.has(typeof value) || value === '' || isNaN(Number(value))) {
    return ''
  }

  let _value = value.toString()
  const diff = fractionDigits - _value.split('.')[0].length

  for (let i = 0; i < diff; i++) {
    _value = `0${_value}`
  }

  return _value
}

/**
 * 保留小数点后位数
 * @param {Number|String} value 数据
 * @param {Number} fractionDigits 小数点后保留位数
 * @param {Boolean} toNumber 是否转为数字
 */
export function tofixed (value: any, fractionDigits = 2, toNumber = false) {
  const allowType = new Set(['string', 'number'])
  if (!allowType.has(typeof value) || value === '' || isNaN(Number(value))) {
    return ''
  }

  let _value = value.toString()
  const _beforeDigits = _value.split('.')[0].length
  _value = Number(_value).toFixed(fractionDigits)
  _value = tofilled(_value, _beforeDigits)

  return toNumber ? Number(_value) : _value
}

/**
 * 批量加载图片
 * @param {Array|String} urls 图片地址
 * @param {Boolean} useCache 是否使用缓存
 *
 * @returns {Promise<Array|String>}
 */
export function loadImages (urls: string | string[], useCache: boolean = true): Promise<HTMLImageElement | HTMLImageElement[]> {
  if (Array.isArray(urls)) {
    const promises = urls.map(url => loadImageSingle(url, useCache))
    return Promise.all(promises)
  }
  return loadImageSingle(urls, useCache)
}

/**
 * json => form
 * @param {*Object} data json数据
 *
 * @returns {FormData}
 */
export const jsonToForm = (data: any) => {
  const params = new FormData()

  for (let key in data) {
    params.append(key, data[key])
  }

  return params
}

/**
 * 从 url 中解析查询参数
 * @param {*String} name 查询参数name
 */
export function parseQuery (name: string): string {
  // 这里不用 location.search, 因为地址为 hash 时, search 为空字符串
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const query = window.location.href.split('?')[1]
  if (!query) {
    return ''
  }
  const search = query.match(reg)

  return search ? search[2] : ''
}

function loadImageSingle (url: any, useCache: any, retry = 1): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    let _url = url
    const img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')

    if (!/^data:/i.test(_url)) {
      const separator = _url.indexOf('?') > -1 ? '&' : '?'
      _url = `${_url}${separator}timestamp=${useCache ? IMG_SUFFIX : Date.now() * Math.random()}`
    }

    img.onload = () => {
      resolve(img)
    }
    img.onerror = async () => {
      if (retry <= 0) {
        reject(new Error(`图片加载失败: ${_url}`))
        return
      }
      try {
        await sleep(1000)
        const res = await loadImageSingle(url, useCache, retry - 1)
        resolve(res)
      } catch (err) {
        reject(err)
      }
    }

    img.src = _url
  })
}
