<template>
  <div class="page-docs">
    <AppHeader />

    <!-- container -->
    <el-scrollbar class="page-component__scroll" ref="componentScrollBar">
      <div class="page-component">
        <el-scrollbar class="page-component__nav">
          <AppNavbar />
        </el-scrollbar>

        <div class="page-component__content markdown">
          <AppMarkdownHeader />
          <router-view class=""></router-view>
        </div>

        <AppPhone class="page-component__phone" v-if="hasExample" />
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import AppNavbar from './work/navbar'
import AppMarkdownHeader from './work/markdown-header'
import AppPhone from './work/phone'
import AppHeader from './work/header'

export default {
  data () {
    return {
    }
  },

  computed: {
    hasExample () {
      return !!this.$route.meta.example
    },
  },

  components: {
    AppNavbar,
    AppPhone,
    AppMarkdownHeader,
    AppHeader,
  },
}
</script>
