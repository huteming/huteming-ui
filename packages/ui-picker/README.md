> 选择器，支持多 slot 联动。

-------------

## 引入

```javascript
import { TmPicker, TmPickerItem } from '@huteming/ui'

Vue.use(TmPicker)
// Vue.component(TmPicker.name, TmPicker)
Vue.use(TmPickerItem)
// Vue.component(TmPickerItem.name, TmPickerItem)
```

## 例子

```html
<tm-picker>
    <tm-picker-item :options="options" v-model="value"></tm-picker-item>
</tm-picker>
```

## Picker

### Slot

| name | 描述 |
|------|--------|
| - | 内容 |

## PickerItem

### API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|-----|--------|------|-------|--------|
| options | 选择项, `label`, `value` 组成的对象数组 | Array |  |  |
| value | 选中返回值 | Any | | |
| | 其他 empty 属性 | | | |
