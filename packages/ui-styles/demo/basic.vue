<template>
  <div class="page-demo">
    <ThemeProvider :theme="theme">
      <tm-button>hello</tm-button>

      <ThemeProvider :theme="innerTheme">
        <tm-button>inner</tm-button>
      </ThemeProvider>
    </ThemeProvider>
  </div>
</template>

<script>
import { createTheme } from '../src/main'

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
      innerTheme: {
        button: {
          borderColorDefault: '#ff9800',
          colorDefault: '#ff9800',
        },
      },
    }
  },
}
</script>
