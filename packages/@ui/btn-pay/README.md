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
    btn="支付学费"
    :btn-style="{ background: 'linear-gradient(137deg,rgba(245,226,147,1) 0%,rgba(230,186,90,1) 100%)', color: 'rgba(128, 79, 36, 1)' }"
    btn-only >
</tm-btn-pay>

<tm-btn-pay
    :price="79"
    through="原价：99元"
    desc="VIP已减20元"
    :desc-style="{ color: 'rgba(217, 166, 47, 1)' }"
    btn="支付学费"
    :btn-style="{ background: 'linear-gradient(137deg,rgba(245,226,147,1) 0%,rgba(230,186,90,1) 100%)', color: 'rgba(128, 79, 36, 1)' }" >
</tm-btn-pay>

<tm-btn-pay
    title="VIP已过期"
    btn="支付学费"
    :btn-style="{ background: 'linear-gradient(137deg,rgba(245,226,147,1) 0%,rgba(230,186,90,1) 100%)' }" >
    <img src="./btn-xuefei.png" alt="" style="width: 76px;" slot="btn">
</tm-btn-pay>

<tm-btn-pay
    btn="购买VIP"
    btn-only >
</tm-btn-pay>

<tm-btn-pay
    :price="79"
    tip="加入VIP"
    desc="可减20元"
    btn="支付学费" >
</tm-btn-pay>
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| price | 左侧价格，保留两位小数并转为数字 | Number | | |
| pricePrefix | 左侧价格前缀 | String | | `￥` |
| title | 左侧显示文案，代替`price` | String | | |
| through | 显示删除样式的文案 | String | | |
| tip | 和through同一位置，只是正常显示，没有删除样式 | String | | |
| desc | `through`下方文案 | String | | |
| descStyle | `desc`的自定义样式 | Object | | |
| btn | 按钮文案 | String | | |
| btnStyle | `btn`自定义样式 | Object | | |
| btnOnly | 只显示按钮,此时默认没有圆角 | Boolean | | `false` |

## 插槽

| name | 描述 |
|------|--------|
| btn | 自定义按钮内容 |

## Events

| 事件名称 | 说明 | 回调参数 |
|---------|----------|-------------|
| click | 按钮点击触发 | |
