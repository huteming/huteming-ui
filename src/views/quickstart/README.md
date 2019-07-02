> 本节将介绍如何在项目中使用 @huteming/ui 以及 @huteming/util。

-----------

## 引入所有组件

你可以引入整个 @huteming/*，或是根据需要仅引入部分组件。我们先介绍如何完整的引入。

### 完整引入

在 main.js 中写入以下内容：

```javascript
import ui from '@huteming/ui'

Vue.use(ui)
```

``` javascript
import * as util from '@huteming/util'

const { animation, api, CanvssDraw, request, Roller, storage, tool, Validator, wxsdk } = util
```

以上代码便完成了 @huteming/* 的引入。

### 按需引入

借助 `babel-plugin-transform-imports`，我们可以只引入需要的组件。

首先，安装 `babel-plugin-transform-imports`：

```javascript
npm install --save-dev babel-plugin-transform-imports
```

然后，将 `.babelrc` 修改为：

```javascript
{
    "plugins": [
        [
            "transform-imports",
            {
                "@huteming/util": {
                    "transform": "@huteming/util/lib/${member}",
                    "preventFullImport": true,
                    "kebabCase": true
                },
                "@huteming/ui": {
                    "transform": "@huteming/ui/lib/${member}",
                    "preventFullImport": true,
                    "kebabCase": true
                },
            }
        ],
    ]
}
```

接下来，如果你只希望引入部分组件，那么可以在需要的组件页面内这么写：

```javascript
import { TmCarousel, TmCarouselItem } from '@huteming/ui'
import { element, CanvasDraw } from '@huteming/util'

// Vue.component(TmCarousel.name, TmCarousel)
Vue.use(TmCarousel)
// Vue.component(TmCarouselItem.name, TmCarouselItem)
Vue.use(TmCarouselItem)
```

各个组件的使用方法请参阅它们各自的文档。
