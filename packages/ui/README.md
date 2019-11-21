> 本节将介绍如何在项目中使用 @huteming/ui。

-----------

## 安装

```javascript
npm install @huteming/ui --save
```

## 引入所有组件

你可以引入整个 @huteming/ui-*，或是根据需要仅引入部分组件。我们先介绍如何完整的引入。

### 完整引入

在 main.js 中写入以下内容：

```javascript
import ui from '@huteming/ui'

Vue.use(ui)
```

以上代码便完成了 @huteming/ui-* 所有组件的引入。

### 按需引入

借助 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)，我们可以只引入需要的组件。

首先，安装 `babel-plugin-import`：

```javascript
npm install --save-dev babel-plugin-import
```

然后，将 `babelrc.config.js` 修改为：

```javascript
{
  plugins: [
    [
      'import',
      {
        libraryName: '@huteming/ui',
        camel2DashComponentName: true,
        customName: (name) => {
          return `@huteming/ui/lib/${name}/${name}.common.js`
        }
      }
    ]
  ]
}
```

接下来，如果你只希望引入部分组件，那么可以在需要的组件页面内这么写：

```javascript
import { TmButton, Actionsheet } from '@huteming/ui'

// Vue.component(TmButton.name, TmButton)
Vue.use(TmButton)
```

各个组件的使用方法请参阅它们各自的文档。
