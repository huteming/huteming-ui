
### 引入

```javascript
import { PickerRange } from '@huteming/ui'

Vue.use(PickerRange)
```

## 代码演示

### 基础用法

```html
<tm-picker-range :visible.sync="visible" v-model="values" :value-text.sync="valuesText">
</tm-picker-range>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| visible | 是否打开，支持sync属性 | Boolean | | |
| value | 选中值。特别注意：这是一个嵌套数组 | Array | | |
| options | 选项。特别注意：这是一个嵌套数组，每个下标都作为一个选项 | Array | | |
| | 其他 toolbar、empty 属性 | | | |

### Events

| name | 说明 | 参数 |
|----------|-----------|----------|
| change | 发生改变时触发 | Function(value, options) |
