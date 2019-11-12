> 滑动开关。

----------

## 引入

```javascript
import { TmSwitch } from '@huteming/ui'

Vue.use(TmSwitch)
// Vue.component(TmSwitch.name, TmSwitch)
```

## 例子

```html
<tm-switch v-model="value"></tm-switch>
```

## API
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| value | 绑定值 | Boolean | | false |
| disabled | 禁用 | Boolean | | false |

## Event
| name | 返回值 |
| ---- | ----- |
| change | checked: Boolean |
