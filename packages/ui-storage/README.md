> 提供本地存储封装方法

-------------------

## 例子

Storage 为构造函数，第一个参数为存储时的命名空间。

```javascript
import { Storage } from '@huteming/util'

const instance = new Storage('prefix')

// 本地存储的真实 key 值为 prefix_key
// window.localStorage.getItem('prefix_key')
instance.setLocal('key', 'value')
instance.getLocal('key')

// 本地存储的真实 key 值为 key
// window.localStorage.getItem('key')
Storage.setLocal('key', 'value')
Storage.getLocal('key')
```

## 构造函数参数

| name | 描述 | 默认参数 |
|------|--------|-------|
| prefix | 存取时的命名前缀 | `''` |

## 实例方法

所有实例方法都有对应的 `静态方法`。区别只是`实例方法`会在存取时，添加 prefix 前缀到 key

| name | 描述 | 参数 |
|------|--------|-------|
| getLocal | localStorage | key |
| setLocal | localStorage, value支持对象属性 | key, value |
| removeLocal | localStorage | key |
| clearLocal | localStorage | |

| name | 描述 | 参数 |
|------|--------|-------|
| getSession | sessionStorage | key |
| setSession | sessionStorage, value支持对象属性 | key, value |
| removeSession | sessionStorage | key |
| clearSession | sessionStorage | |
