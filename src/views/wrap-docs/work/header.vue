<template>
  <header class="header" ref="header">
    <div class="header-container">
      <div class="header-logo">
        <i class="tm-icon tm-icon-github"></i>
      </div>

      <div class="header-search">
        <input type="text" placeholder="Search or jump to...">
      </div>

      <div class="header-links">
        <router-link class="header-text" tag="div" v-for="item in navbars" :key="item.rootPath" :to="item.rootPath">{{ item.headTitle }}</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import config from 'src/config'

export default {
  data () {
    return {
      navbars: config.map(item => ({ rootPath: `/${item.rootPath}`, headTitle: item.headTitle })),
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/mixins/index.scss';

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $header-height;
    background-color: #24292e;
    z-index: 2000;

    &-logo {
        line-height: 1;
        color: #fff;
        i {
            font-size: 32px;
        }
    }

    &-search {
        margin-left: 16px;
        width: 300px;
        height: 28px;

        input {
            display: block;
            height: 28px;
            width: 300px;
            box-sizing: border-box;
            background: hsla(0,0%,100%,.125);
            border: none;
            outline: none;
            border-radius: 3px;
            padding: 6px 8px;
            font-size: 14px;
            color: #fff;
        }
    }

    &-links {
        margin-left: 16px;
        display: flex;
        align-items: center;
    }

    &-text {
        position: relative;
        // color: #1989FA;
        color: #fff;
        font-weight: 600;
        // opacity: 0.5;
        cursor: pointer;

        &:hover {
            color: hsla(0,0%,100%,.7);
        }

        & + & {
            margin-left: 20px;
        }

        // &:hover,
        // &.router-link-active {
        //     opacity: 1;
        // }

        // &.router-link-active:after {
        //     content: ' ';
        //     position: absolute;
        //     bottom: 0;
        //     left: 0;
        //     right: 0;
        //     height: 2px;
        //     background: #409eff;
        // }
    }

    &-container {
        padding: 0 20px;
        display: flex;
        align-items: center;
        line-height: $header-height;
        border-bottom: 1px solid #e6e6e6;
        box-shadow: 0 3px 8px 0 rgba(116, 129, 141, 0);
        box-sizing: border-box;
    }
}
</style>
