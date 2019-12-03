## 代码演示

### 自定义变量

```html
<theme-provider :theme="theme">
    <tm-button>hello</tm-button>
</theme-provider>
```

```js
import { createTheme, ThemeProvider } from '@huteming/ui-styles'

const theme = createTheme({
    button: {
        borderColorDefault: 'lightblue',
        colorDefault: 'lightBlue',
    },
})

export default {
    data () {
        return {
            theme,
        }
    },
}
```

### 嵌套主题

```html
<theme-provider :theme="theme">
    <tm-button>hello</tm-button>

    <theme-provider :theme="innerTheme">
        <tm-button>inner</tm-button>
    </theme-provider>
</theme-provider>
```

```js
import { createTheme, ThemeProvider } from '@huteming/ui-styles'

const theme = createTheme({
    button: {
        borderColorDefault: 'lightblue',
        colorDefault: 'lightBlue',
    },
})
const innerTheme = createTheme({
    button: {
        borderColorDefault: '#ff9800',
        colorDefault: '#ff9800',
    },
})

export default {
    data () {
        return {
            theme,
            innerTheme,
        }
    },
}
```
