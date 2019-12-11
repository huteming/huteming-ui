
### 引入

```javascript
import { Switch } from '@huteming/ui'

Vue.use(Switch)
```

## 代码演示

### 基础用法

```html
<tm-switch v-model="value"></tm-switch>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| value | 绑定值 | Boolean | | false |
| disabled | 禁用 | Boolean | | false |

### Events

| name | 返回值 |
| ---- | ----- |
| change | checked: Boolean |
