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

`add` 方法并不要求所有的 `rate` 总和为 `100`。方法内部会根据各个 `rate` 所占比例作为概率

| name | 描述 | 参数 |
|----------|------------|-------------|
| add | 添加概率区间 | |
| done | 产生随机数，并返回对应 value | |

## add 参数

| name | 说明 | 类型 | 可选值 | 默认值 |
|-----------|------------|-------------|------------|-----------|
| value | 唯一标识符，内部不关心该数据，会在获取随机数后返回给外部 | Any | |
| rate | 占据比例, 任意数字 | Number | | |
