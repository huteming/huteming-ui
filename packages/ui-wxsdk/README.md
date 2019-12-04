> 微信[JS-SDK](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)是`微信公众平台`面向网页开发者提供的基于微信内的网页开发工具包。本仓库是对官方sdk的再封装。方便项目中以`Promise`形式调用，并提供一些默认参数

-----------------------

### 引用

```javascript
import { wxsdk } from '@huteming/ui'

wxsdk.wxConfig()
wxsdk.wxShare()
```

### 实例方法

| name | 描述 | 参数 |
|------|--------|-------|
| wxSave | 保存当前页面地址 | String: url |
| wxConfig | 配置JS-SDK | [`String`, `Array`]: api |
| wxLocation | 获取地理位置 | |
| wxShare | 微信分享 | Object: optionsShare |
| wxpay | 微信支付 | Object: optionsPay |
| wxHide | 隐藏微信工具栏 | |

### optionsShare

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| title | 分享标题 | String | | |
| desc | 分享描述 | String | | |
| link | 分享链接 | String | | |
| imgUrl | 分享图标 | String | | |
| success | 设置成功回调 | Function | | |
| fail | 设置失败回调 | Function | | |
| cancel | 取消回调 | Function | | |
