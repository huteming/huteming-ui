> 提供工具类方法

----------------------

## 例子

```javascript
import { tool } from '@huteming/util'

tool.loadImages()
```

| name | 描述 | 参数 | 返回 |
|------|--------|-------|----------|
| loadImages | 加载图片 | [`String`, `Array`]: urls | Promise<Image> |
| jsonToForm | json数据转Form | Object: data | Form: data |
| parseQuery | 从 url 中解析查询参数 | String: key | String: value |
