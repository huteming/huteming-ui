> 提供HtmlElement一些辅助方法

----------------------

## 例子

```javascript
import { element } from '@huteming/util'

tool.isInContainer()
```

## Api

| name | 描述 | 参数 | 返回 |
|------|--------|-------|----------|
| isInContainer | 检测是否在容器内可视 | `element`, `container` | Boolean |
| on | 监听事件 | `element`, `event`, `handler` | |
| off | 移除监听 | `element`, `event`, `handler` | |
| autoprefixer | 添加样式前缀，一般在自定义 style 时使用 | `style` | Object |
| scrollX | 设置滚动条位置 | `element`, `x` | Number |
| scrollY | 设置滚动条位置 | `element`, `y` | Number |
| scrollTo | 设置滚动条位置 | `element`, `x`, `y` | Number |
| getScrollLeft | 获取X轴滚动条位置 | `element` | Number |
| getScrollTop | 获取Y轴滚动条位置 | `element` | Number |
| attached | 检测 element 是否已插入文档 | `element`, `success`, `fail`, `options` | |
| camelCase | 转换为驼峰命名 | `name` | String |
| getStyle | 转换为驼峰命名 | `element`, `styleName` | String |
| isScroll | 检测是否支持滚动 | `element`, `vertical` | Boolean |
| getScrollContainer | 最近一个 overflow 值为 auto 或 scroll 的父元素 | `element`, `vertical` | Element |
