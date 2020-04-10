<template>
  <div class="page-demo">
    <button @click="$refs.field.focus()">click to focus</button>

    <demo-divider>输入框</demo-divider>
    <demo-cell>
      <TmField ref="field" v-model="value1" placeholder="请输入qq号" @focus="handleLog('force')" @blur="handleLog('blur')" @change="handleLog('change')" slot="body" />
    </demo-cell>

    <demo-divider>文本域</demo-divider>
    <demo-cell>
      <TmField type="textarea" rows="3" v-model="value2" placeholder="请输入文本" @focus="handleLog('force')" @blur="handleLog('blur')" @change="handleLog" />
    </demo-cell>

    <demo-divider>带有清除控件</demo-divider>
    <demo-cell>
      <TmField ref="field" v-model="value3" placeholder="请输入" slot="body" clearable />
    </demo-cell>

    <demo-divider>高度自适应文本域</demo-divider>
    <demo-cell>
      <TmField type="textarea" v-model="value4" placeholder="请输入" slot="body" autosize />
    </demo-cell>
    <demo-cell>
      <TmField type="textarea" v-model="value5" placeholder="请输入" slot="body" :autosize="{ minRows: 2, maxRows: 3 }" />
    </demo-cell>

    <demo-divider>主题定制</demo-divider>
    <demo-cell>
      <ThemeProvider :theme="theme" slot="body">
        <TmField placeholder="主题定制" />
      </ThemeProvider>
    </demo-cell>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      visible: false,
      theme: {
        field: {
          textAlign: 'right',
        },
      },
    }
  },

  watch: {
    value1 (val) {
      console.log('watch', val, val.indexOf('\n'))
    },
    value2 (val) {
      console.log('watch', val, val.indexOf('\n'))
    },
    async visible (val) {
      if (val) {
        await this.$nextTick()
        this.$refs.field.focus()
      }
    },
  },

  methods: {
    handleBlur () {
    },
    handleSubmit () {
      this.$message('hello')
    },
    handleLog (action, ...args) {
      console.log(action, ...args)
    },
  },
}
</script>

<style lang="scss" scoped>
.demo {
    min-height: 100vh;
    background-color: #f6f6f6;

    &-submit {
        width: 3.76rem;
        height: .88rem;
        margin: 0 auto;
        font-size: .32rem;
        line-height: .88rem;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        background: linear-gradient(126deg,rgba(46,166,254,1) 0%,rgba(144,226,254,1) 100%);
        border-radius: .44rem;
        box-sizing: border-box;
    }

    &-tip1 {
        height: rem(47);
        padding: 0 rem(20.4) 0 rem(24);
        font-size: rem(34);
        line-height: rem(47);
        color: #576B95;
        box-sizing: content-box;
    }

    &-header {
        padding: rem(32) rem(32) rem(6) rem(32);
        font-size: rem(28);
        line-height: 1.4;
        color: rgba(0, 0, 0, 0.5);
        background: #ededed;
    }

    &-footer {
        padding: rem(8.4) rem(32) 0 rem(32);
        font-size: rem(28);
        color: rgba(0, 0, 0, 0.5);
        background: #ededed;
    }
}
</style>
