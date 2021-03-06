import { getPayConfig } from 'packages/ui-api/src/main'
import { WxPayOptions } from '../types'

/**
 * 微信支付
 */
export default async function wxPay (params: any, options: WxPayOptions = {}) {
  const { data: { data } } = await getPayConfig(params)

  if (!options.debug) {
    await payInProd(data)
  } else {
    console.log(params)
  }
}

function payInProd (data: any) {
  return new Promise((resolve, reject) => {
    const payHandler = onBridgeReady(data, resolve, reject)

    if (typeof window.WeixinJSBridge === 'undefined') {
      document.addEventListener('WeixinJSBridgeReady', payHandler, false)
    } else {
      payHandler()
    }
  })
}

function onBridgeReady (paramsStr: string, resolve: () => void, reject: (reason: Error) => void) {
  return function () {
    window.WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      JSON.parse(paramsStr),
      function (res) {
        switch (res.err_msg) {
        case 'get_brand_wcpay_request:ok': //  支付成功
          resolve()
          break
        default: // 统一认为支付失败（可能为取消支付）
          reject(new Error(`支付失败: ${res.err_msg}`))
          break
        }
      }
    )
  }
}
