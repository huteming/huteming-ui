> 锚点

-------------

## 引入

```javascript
import { Anchor } from '@huteming/ui'

Vue.use(Anchor)
// Vue.directive(Anchor.name, Anchor)
```

## 例子

```html
<div v-anchor="{ selector: '#target', container: '.basic' }">锚点</div>
```

## API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| selector | 锚点滚动目标 | String | | |
| container | 滚动容器，默认会自动递归查找selector可滚动父元素 | String | | |
