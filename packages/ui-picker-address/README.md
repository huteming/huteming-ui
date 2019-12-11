
### 引入

```javascript
import { PickerAddress } from '@huteming/ui'

Vue.use(PickerAddress)
```

## 代码演示

### 基础用法

```html
<tm-picker-address :visible.sync="visible" v-model="values" :value-text.sync="valuesText">
</tm-picker-address>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| visible | 是否打开，支持sync属性 | Boolean | | |
| value | 选值的地址。注意：这是一个code数组，不是中文地址 | Array | | |
| valueText | 选值的地址，这是中文地址，支持sync属性。 | Array | | |

### Events

| name | 说明 | 参数 |
|----------|-----------|----------|
| change | 地址发生改变时触发 | Function(value, valueText) |
