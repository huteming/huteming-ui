
### 引入

```javascript
import { Field } from '@huteming/ui'

Vue.use(Field)
```

## 代码演示

### 基础用法

```html
<tm-field type="textarea" rows="3" v-model="value">
</tm-field>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| type | 类型 | String | `text`, `textarea` 和其他 原生 input 的 type 值 | `text` |
| value | 绑定指 | String, Number | - | - |
| clearable | 是否显示清除控件 | *boolean* | - | `false` |
| label | 输入框关联的label文字 | string | | |
| inputStyle | 输入框样式 | Object | | |
| - | 其他输入框原生属性；如：rows | | | |

### Events

| 事件名称 | 说明 | 回调参数 |
|---------|----------|-------------|
| change | 在 Input 值改变时触发 | (value: string | number) |
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
