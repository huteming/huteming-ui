> 概率随机算法

-------------------

## 示例

```javascript
import { Roller } from '@huteming/util'

const roller = new Roller()

roller.add(value, rate)

const value = roller.done()
```

## 实例方法

`add` 方法并不要求所有的 `rate` 总和为 `100`。方法内部会根据各个 `rate` 所占比例作为概率产生随机数，并在 `done` 方法中返回对应 `value`

| name | 描述 | 参数 |
|----------|------------|-------------|
| add | 添加概率区间 | Any: value, Number: rate |
| done | 产生随机数，并返回对应 value | |
