
### 引入

```javascript
import { Typography } from '@huteming/ui'

Vue.use(Typography)
```

## 代码演示

### 基础用法

```html
<tm-typography variant="h1">h1</tm-typography>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| variant | 字体类型 | String | `h1` `h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'button', 'overline', 'inherit'` | `body1` |
| gutterBottom | 是否添加下边距 | Boolean | - | `false` |
