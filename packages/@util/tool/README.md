> 提供工具类方法

----------------------

## 例子

```javascript
import { tool } from '@huteming/util'

tool.isWeixinBrowser()
```

## Api

| name | 描述 | 参数 | 返回 |
|------|--------|-------|----------|
| isWeixinBrowser | 检测是否在微信内 | | Boolean |
| tofilled | 数字之前补0 | `value`, `fractionDigits` | String |
| tofixed | 数字之后补0 | `value`, `fractionDigits`, `toNumber` | String, Number |
| loadImages | 加载图片 | `urls`, `useCache` | Promise<Image> |
| jsonToForm | json数据转Form | Object: data | Form: data |
| parseQuery | 从 url 中解析查询参数 | String: key | String: value |
