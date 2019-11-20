<div align="center">
    <a href="https://travis-ci.org/huteming/huteming-ui">
        <img src="https://travis-ci.org/huteming/huteming-ui.svg?branch=master" alt="Build Status" />
    </a>
    <a href='https://coveralls.io/github/huteming/huteming-ui'>
        <img src='https://coveralls.io/repos/github/huteming/huteming-ui/badge.svg' alt='Coverage Status' />
    </a>
</div>

# @huteming 功能组件

> Mobile UI elements for **Vue 2.0**

- [主页](https://github.com/huteming/web)
- [文档](https://huteming.github.io/web/)



## 安装
```shell
npm install --save @huteming/ui
npm install --save @huteming/util
```

## 用法

### 完整引入

全局引入所有组件

```javascript
import Vue from 'vue'
import ui from '@huteming/ui'
import '@huteming/ui/dist/huteming-ui.css'

Vue.use(ui)
```

引入所有工具函数

```javascript
// { animation, api, CanvssDraw, request, Roller, storage, tool, Validator, wxsdk }
import * as util from '@huteming/util'

console.log(util)
```

### 按需引入

借助 [babel-plugin-transform-imports](https://www.npmjs.com/package/babel-plugin-transform-imports)，我们可以只引入需要的组件，以达到减小项目体积的目的。

首先，安装 babel-plugin-component：

```shell
npm install babel-plugin-transform-imports --save-dev
```

然后，将 `.babelrc` 修改为：

```javascript
{
    'plugins': [
        [
            'transform-imports',
            {
                '@huteming/util': {
                    'transform': '@huteming/util/lib/${member}',
                    'preventFullImport': true,
                    'kebabCase': true,
                },
                '@huteming/ui': {
                    'transform': '@huteming/ui/lib/${member}',
                    'preventFullImport': true,
                    'kebabCase': true,
                },
            }
        ],
    ]
}
```

接下来，如果你只希望引入部分组件，比如 Picker 和 Flex，那么需要在 main.js 中写入以下内容：

```javascript
import Vue from 'vue';
import { Picker, Flex } from '@huteming/ui'
import App from './App.vue'

Vue.component(Picker.name, Picker)
Vue.component(Flex.Flex, Select)
/* 或写为
 * Vue.use(Button)
 * Vue.use(Cell)
 */

new Vue({
    el: '#app',
    render: h => h(App)
})
```

## 开始使用

至此，一个基于 Vue 和 @huteming/* 的开发环境已经搭建完毕，现在就可以编写代码了。各个组件的使用方法请参阅它们各自的文档。
