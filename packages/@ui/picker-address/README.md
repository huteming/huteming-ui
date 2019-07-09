> 地址选择器

-------------

## 引入

```javascript
import { TmPickerAddress } from '@huteming/ui'

Vue.use(TmPickerAddress)
// Vue.component(TmPickerAddress.name, TmPickerAddress)
```

## 例子

```html
<tm-picker-address :visible.sync="visible" v-model="values" :value-text.sync="valuesText">
</tm-picker-address>
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| visible | 是否打开，支持sync属性 | Boolean | | |
| value | 选值的地址。注意：这是一个code数组，不是中文地址 | Array | | |
| valueText | 选值的地址，这是中文地址，支持sync属性。 | Array | | |

## 事件

| name | 说明 | 参数 |
|----------|-----------|----------|
| change | 地址发生改变时触发 | Function(value, valueText) |
