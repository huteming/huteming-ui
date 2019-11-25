
### 引入

```javascript
import Vue from 'vue'
import { Actionsheet } from '@huteming/ui'

Vue.use(Actionsheet)
```

## 代码演示

### 基础用法

`Actionsheet`通过`menus`数组来定义展示的选项，数组的每一项是一个对象，对象属性见文档下方表格。

```javascript
export default {
  data() {
    return {
      menus: [
        { label: '选项', value: '返回值' },
      ]
    };
  },

  methods: {
    onShow () {
      Actionsheet(this.menus)
          // 点击菜单关闭
          .then(value => {})
          // 点击取消或遮层关闭
          .catch(() => {})
    }
  }
}
```

### 不显示取消按钮

```javascript
export default {
  data() {
    return {
      menus: [
        { label: '选项', value: '返回值' },
      ]
    };
  },

  methods: {
    onShow () {
      Actionsheet({ menus: this.menus, cancelText: '' })
          // 点击菜单关闭
          .then(value => {})
          // 点击取消或遮层关闭
          .catch(() => {})
    }
  }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|-------|---------|-------|--------|
| title | 标题 | string | - | - |
| menus | 菜单项数组 | Menu[] | - | - |
| cancelText | 取消按钮的文本。若设为空字符串，则不显示取消按钮 | string | - | `取消` |
| closeOnClickModal | 是否可以通过点击 modal 层来关闭 `actionsheet` | boolean | - | `true` |

### Menu数据结构

actions属性为一个对象数组，数组中的每个对象配置一列，对象可以包含以下值：

| 键名 | 说明 | 类型 |
|------|-------|---------|
| label | 显示文案 | string |
| value | 点击后返回值 | any |
