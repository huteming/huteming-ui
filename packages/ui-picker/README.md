
### 引入

```javascript
import { Picker } from '@huteming/ui'

Vue.use(Picker)
Vue.use(Picker.item)
```

## 代码演示

### 基础用法

```html
<tm-picker>
    <tm-picker-item :options="options" v-model="value"></tm-picker-item>
</tm-picker>
```

## Picker

### Slots

| name | 描述 |
|------|--------|
| - | 内容 |

## PickerItem

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|--------|------|-------|--------|
| options | 选择项, `label`, `value` 组成的对象数组 | Array |  |  |
| value | 选中返回值 | Any | | |
| | 其他 empty 属性 | | | |
