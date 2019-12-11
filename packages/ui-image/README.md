
### 引入

```javascript
import { Image } from '@huteming/ui'

Vue.use(Image)
```

## 代码演示

### 基本用法

```html
<tm-image :src="src" style="width: 100px; height: 100px;"></tm-image>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| src | 图片地址 | `String` | | |
| fit | 确定图片如何适应容器框，同原生 object-fit | string | fill / contain / cover / none / scale-down | |
| lazy | 是否开启懒加载 | boolean | | false |
| hold | 初始为添加图片样式，src改变后会被覆盖 | boolean | | false |
| scroll-container | 开启懒加载后，监听 scroll 事件的容器 | string / HTMLElement | | 最近一个 overflow 值为 auto 或 scroll 的父元素 |

### Events

| 事件名称 | 说明 | 回调参数 |
|---------|----------|-------------|
| load | 图片加载成功触发 | (e: Event) |
| error | 图片加载失败触发 | (e: Error) |

### Slots

| 名称 | 说明 |
|------------|----------|
| placeholder | 添加图片样式占位 |
| loading | 加载中的内容 |
| error | 加载失败的内容 |
