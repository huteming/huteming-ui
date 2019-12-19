<template>
  <div class="page-demo">
    <TmCell header="header" body="body" footer="footer" link />
    <TmCell body="并列自动添加边框" link />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
    }
  },

  methods: {
    handleLog (action, ...args) {
      console.log(action)
      // console.log('args', ...args)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
