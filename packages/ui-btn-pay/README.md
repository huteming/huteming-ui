
### 引入

```js
import { BtnPay } from '@huteming/ui'

Vue.use(BtnPay)
// Vue.component(BtnPay.name, BtnPay)
```

## 代码演示

### 基础用法

```html
<tm-btn-pay
    title="79"
    tip="原价：99元"
    desc="VIP已减20元"
    btn="支付学费" >
</tm-btn-pay>
```

### 显示标题

```html
<tm-btn-pay
    titlePrefix=""
    title="放大标题"
    btn="支付学费">
</tm-btn-pay>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| title | 左侧显示文案 | *string \| number* | - | - |
| titlePrefix | 价格前缀 | *string* | - | `￥` |
| titleStyle | title自定义样式 | *object* | - | - |
| tip | 中间上方文案 | *string* | - | - |
| tipThrough | 中间上方文案添加删除线 | *boolean* | - | `true` |
| tipStyle | tip自定义样式 | *object* | - | - |
| desc | 中间下方文案 | *string* | - | - |
| descThrough | 中间下方文案添加删除线 | *boolean* | | `false` |
| descStyle | desc的自定义样式 | *object* | - | - |
| btn | 按钮文案 | *string* | - | - |
| btnStyle | btn自定义样式 | *object* | - | - |
| disabled | 禁用状态 | *boolean* | - | `false` |

### Slots

| name | 描述 |
|------|--------|
| title | 自定义标题 |
| tip | 中间上方文案 |
| desc | 中间下方文案 |
| btn | 自定义按钮内容 |

### Events

| 事件名称 | 说明 | 回调参数 |
|---------|----------|-------------|
| click | 按钮点击触发(**注: disabled为true时, 点击事件依旧会传递**) | |
