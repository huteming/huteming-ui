### 安装

```bash
npm install @huteming/ui --save
```

## 引入组件

### 方式一、按需引入(推荐)

借助 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)，我们可以只引入需要的组件。

```bash
# 安装插件
npm install --save-dev babel-plugin-import
```

```js
// 在 babelrc.config.js 添加配置
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

```js
// 接着你可以在代码中直接引入组件
// 插件会自动将代码转化为方式二中的按需引入形式
import { Button, Actionsheet } from '@huteming/ui'
// Vue.component(Button.name, Button)
Vue.use(Button)
```

> 如果你在使用 TypeScript，可以使用 [ts-import-plugin](https://github.com/Brooooooklyn/ts-import-plugin) 实现按需引入

### 方式二、手动按需引入组件

在不使用插件的情况下，可以手动引入需要的组件

```js
import Button from '@huteming/ui/lib/button/button.common.js'
```

### 方式三、引入所有组件

```js
import ui from '@huteming/ui'

Vue.use(ui)
```

### 方式四、通过 CDN 引入

```html
<!-- 引入 Vue 和 Vant 的 JS 文件 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.min.js"></script>
<script src="https://unpkg.com/@huteming/ui/dist/huteming-ui.umd.js"></script>
```

```html
<div id="app">
  <tm-cell body="快速开始" link></tm-cell>
</div>
```

```js
// 在 #app 标签下渲染一个按钮组件
new Vue({
  el: '#app',
})
```

## Hello world

### [在线演示](https://codepen.io/huteming/pen/BaaXXLZ)

<iframe height="265" style="width: 100%;" scrolling="no" title="Element demo" src="//codepen.io/huteming/pen/BaaXXLZ/?height=265&theme-id=light&default-tab=html" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/huteming/pen/BaaXXLZ'>huteming-ui demo</a> by huteming
  (<a href='https://codepen.io/huteming'>@huteming</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 各个组件的使用方法请参阅它们各自的文档。
