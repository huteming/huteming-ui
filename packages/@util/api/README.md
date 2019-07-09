> 提供一些项目内常用的 http 请求

--------------

## 示例

```javascript
import { api } from '@huteming/util'
```

## 方法

| 函数 | 请求地址 | 说明 | 参数 |
|----------|-----------|-------------|--------|
| sign | /api/system/pageStat | 统计 | itemSign, itemRemark, { type } |
| getPayConfig | /api/weixin/getPayParameters | 获取支付参数 | options |
| getWxConfig | /api/user/shareParam | 获取wxsdk配置参数 | options |
| parseGeocoder | https://api.map.baidu.com/geocoder/v2/ | 解析经纬度地址坐标 | { lng, lat, type } |

