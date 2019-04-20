> 本节将介绍如何在项目中使用 @huteming/ui 以及 @huteming/util。

-----------

## 引入所有组件

你可以引入整个 @huteming/*，或是根据需要仅引入部分组件。我们先介绍如何完整的引入。

### 完整引入

在 main.js 中写入以下内容：

```javascript
import ui from '@huteming/ui'
import '@huteming/ui/dist/huteming-ui.css'

Vue.use(ui)
```

``` javascript
// { animation, api, CanvssDraw, request, Roller, storage, tool, Validator, wxsdk }
import * as util from '@huteming/util'

console.log(util)
```

以上代码便完成了 @huteming/* 的引入。

### 按需引入

```javascript
// 如果你只希望引入部分组件，比如 Picker 和 Flex
import { Picker, Flex } from '@huteming/ui'

Vue.use(Button)
Vue.use(Cell)
```

```javascript
// 如果只需要引入部分函数
import { api } from '@huteming/util'

console.log(api)
```

各个组件的使用方法请参阅它们各自的文档。
