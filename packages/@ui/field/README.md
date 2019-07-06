> 输入框

-------------

## 引入

```javascript
import { Input } from '@huteming/ui'

Vue.component(Input.name, Input)
// Vue.use(Input)
```

## 例子

```html
<tm-input placeholder="hello world" ></tm-input>
```

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| type | 类型 | String | `text`, `textarea` 和其他 原生 input 的 type 值 | `text` |
| value | 绑定指 | String, Number | - | - |
| classInput | 输入框类名 | String | - | - |

### Events

| 事件名称 | 说明 | 回调参数 |
|---------|----------|-------------|
| change | 在 Input 值改变时触发 | (value: string | number) |
| blur | 在 Input 失去焦点时触发 | (event: Event) |
| focus | 在 Input 获得焦点时触发 | (event: Event) |
