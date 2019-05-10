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
    price="12.00"
    through="原价：13.00"
    text="限时特价"
    btn="支付学费"
    @click="handleClick">
</tm-btn-pay>
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| price | 最后的支付价格 | Number, String | | |
| through | 显示删除样式的文案 | String | | |
| tip | 和through同一位置，只是正常显示，没有删除样式 | String | | |
| text | 标识文案，如 `显示特价` | String | | |
| btn | 按钮文案 | String | | |
| btnBackground | 按钮背景色 | String | | `linear-gradient(154deg,rgba(84,171,255,1) 0%,rgba(42,115,253,1) 100%)` |

## Events

| 事件名称 | 说明 | 回调参数 |
|---------|----------|-------------|
| click | 按钮点击触发 | |
