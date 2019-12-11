
### 引入

```javascript
import { Popup } from '@huteming/ui'

Vue.use(Popup)
```

## 代码演示

### 基础用法

```html
<tm-popup v-model="visible" position="bottom">
    ...
</tm-popup>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| value | 控制 Popup 的显示与隐藏 | Boolean |  | false |
| before-close | 关闭前的回调，会暂停 Popup 的关闭, done 用于关闭 popup | Function | (done) |  |
| position | Popup 的位置 | String | `middle`<br>`top`<br>`bottom`<br>`left`<br>`right` | `middle` |
| close-on-click-modal | 是否可以通过点击 modal 层来关闭 Popup | Boolean | | true |

### Events

| name | 描述 | 回调参数 |
|------|--------|-------|
| open | Popup 打开的回调 | - |
| close | Popup 关闭的回调 | - |
| closed | Popup 关闭动画结束时的回调 | - |

### Slots

| name | 描述 |
|------|--------|
| - | 弹出框的内容 |
