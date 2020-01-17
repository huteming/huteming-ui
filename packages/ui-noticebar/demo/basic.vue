<template>
  <div class="page-demo">
    <tm-noticebar>
      <span>这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……</span>
    </tm-noticebar>

    <demo-divider>不循环</demo-divider>

    <tm-noticebar :loop="false">
      <span>这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……</span>
    </tm-noticebar>

    <demo-divider>无图标</demo-divider>

    <tm-noticebar icon="" mode="link" @click="handleClick">
      <span>这是一句绕口令：黑灰化肥会挥发发灰黑化肥</span>
    </tm-noticebar>

    <demo-divider>自定义图标</demo-divider>

    <tm-noticebar icon="notification_important" mode="closeable" @click="handleClick">
      <span>这是一句绕口令：黑灰化肥会挥发发灰黑化肥</span>
    </tm-noticebar>

    <demo-divider>自定义文案</demo-divider>

    <tm-noticebar mode="closeable">
      <span>这是一句绕口令：黑灰化肥会挥发发灰黑化肥</span>
      <div style="color: #a1a1a1;" slot="action">不再提示</div>
    </tm-noticebar>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick () {
      this.$message.success('1')
    },
  },
}
</script>
