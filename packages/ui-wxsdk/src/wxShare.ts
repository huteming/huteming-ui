import { sign } from '@huteming/ui-api/src/main'
import { parse, stringify } from 'utils/tools'
import wxConfig from './wxConfig'
import { WxShareOptions, WxShareConfig } from '../types'

/**
 * 分享。jssdk说明文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
const defaultOption = {
  link: window.location.href,
  // imgUrl: 'http://jhsy-img.caizhu.com/jhsy/images/logo-white.png', // 静好教育
  imgUrl: 'http://jhsy-img.caizhu.com/fejhsy/images/logo.png', // 静好书院
  channel: false,
  query: null,
}

export default async function wxShare (options: WxShareOptions) {
  const config = Object.assign({}, defaultOption, options)

  // link
  if (!config.link.startsWith('http')) {
    config.link = `${window.location.origin}${config.link}`
  }

  // success
  const success = config.success
  config.success = () => {
    // 自己的统计
    sign('', '', { type: 'share' })

    if (typeof success === 'function') {
      success()
    }
  }

  // 添加渠道参数
  if (config.channel) {
    config.link = setChannelToLink(config)
  }

  // 添加自定义查询参数
  if (Array.isArray(config.query)) {
    config.link = setQueryToLink(config)
  }

  await wxConfig(false)

  window.wx.showMenuItems({
    menuList: [
      'menuItem:share:timeline',
      'menuItem:share:appMessage',
    ],
  })
  window.wx.onMenuShareTimeline(config)
  // wx.updateTimelineShareData(config)
  window.wx.onMenuShareAppMessage(config)
  // wx.updateAppMessageShareData(config)

  return config
}

// 添加地址栏中的查询参数(渠道参数)到分享地址中
function setChannelToLink ({ link }: WxShareConfig) {
  const [_url, _search] = link.split('?')
  const _query = parse(_search)

  const { mainUnion = '', subUnion = '' } = parse(window.location.href.split('?')[1], { ignoreQueryPrefix: true })

  _query['mainUnion'] = mainUnion
  _query['subUnion'] = subUnion

  return [_url, '?', stringify(_query)].join('')
}

// 自定义查询参数
function setQueryToLink ({ link, query }: WxShareConfig) {
  const [_url, _search] = link.split('?')
  const _query = parse(_search)

  query.forEach(({ key, value, force }) => {
    if (force) {
      _query[key] = value
      return
    }

    if (!_query[key]) {
      _query[key] = value
    }
  })

  return [_url, '?', stringify(_query)].join('')
}
