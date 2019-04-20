> 验证器

-------------------

## 示例

```javascript
import { Validator } from '@huteming/util'

const v = new Validator()

v.add(value, type, errorMessage, ...args)

const message = v.done()
```

## 实例方法

| name | 说明 | 参数 |
|----------|------------|------------|
| add | 添加验证器 | addArgs |
| done | 执行验证，返回 errorMessage。正确时返回 "" | |

### addArgs

| name | 说明 | 类型 | 可选值 | 默认值 |
|-----------|------------|-------------|------------|-----------|
| value | 需要校验的值 | Any | |
| type | 验证器 | String | `required`, `email`, `mobile`, `number`, `length`, `range` | |
| errorMessage | 错误提示 | String | | |
| args | 验证器其他参数 | Any | | |

args补充说明：例如 `length` 方法需要两个额外的参数 `min` 和 `max`。调用方式如下 `v.add(value, 'length', errorMessage, min, max)`
