> 支付按钮

-------------

## 引入

```javascript
import { TmBtnPay } from '@huteming/ui'

Vue.use(TmBtnPay)
// Vue.component(TmBtnPay.name, TmBtnPay)
```

## 例子

```html
<tm-btn-pay
    :title="79"
    tip="原价：99元"
    tipThrough
    desc="VIP已减20元"
    :desc-style="{ color: 'rgba(217, 166, 47, 1)' }"
    :btn-style="{ background: 'linear-gradient(137deg,rgba(245,226,147,1) 0%,rgba(230,186,90,1) 100%)', color: 'rgba(128, 79, 36, 1)' }"
    btn="支付学费" >
</tm-btn-pay>
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| title | 左侧显示文案。如果类型是数字，添加价格过滤器 | `String`, `Number` | | |
| titlePrefix | 前缀。如果title是数字，默认为 ￥ | String | | |
| titleStyle | title自定义样式 | Object | | |
| tip | 中间上方文案 | String | | |
| tipThrough | 中间上方文案添加删除线 | Boolean | | `false` |
| tipStyle | tip自定义样式 | Object | | |
| desc | 中间下方文案 | String | | |
| descThrough | 中间下方文案添加删除线 | Boolean | | `false` |
| descStyle | `desc`的自定义样式 | Object | | |
| btn | 按钮文案 | String | | |
| btnStyle | `btn`自定义样式 | Object | | |
| btnOnly | 只显示按钮,此时默认没有圆角 | Boolean | | `false` |
| disabled | 禁用状态 | Boolean | | `false` |

## 插槽

| name | 描述 |
|------|--------|
| title | 自定义标题 |
| tip | |
| desc | |
| btn | 自定义按钮内容 |

## Events

| 事件名称 | 说明 | 回调参数 |
|---------|----------|-------------|
| click | 按钮点击触发 | |
