
### 引入

```javascript
import { Toolbar } from '@huteming/ui'

Vue.use(Toolbar)
```

## 代码演示

### 基础用法

```html
<tm-toolbar title="标题栏">
</tm-toolbar>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| title | 标题 | `String` | | |
| confirmText | 确认按钮文案 | `String` | | 确认 |
| showConfirm | 是否显示确认按钮 | Boolean | | true |
| cancelText | 取消按钮文案 | String | | 取消 |

### Events

| name | 说明 |
|------|-------|
| confirm | 点击确认 |
| cancel | 点击取消 |
