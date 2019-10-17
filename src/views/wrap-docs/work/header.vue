<template>
<header class="header" ref="header">
    <div class="header-container">
        <div class="header-logo">
            <img src="@/assets/images/logo.png" alt="" style="display: block; height: 100%;">
        </div>

        <div class="header-links">
            <router-link class="header-text" tag="div" to="/guide">指南</router-link>
            <router-link class="header-text" tag="div" to="/component">组件</router-link>
            <router-link class="header-text" tag="div" to="/function">函数</router-link>
        </div>
    </div>
</header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: #fff;
    z-index: 2000;

    &-logo {
        height: 60px;
    }

    &-links {
        display: flex;
        align-items: center;
    }

    &-text {
        position: relative;
        margin: 0 22px;
        color: #1989FA;
        opacity: 0.5;
        cursor: pointer;

        &:hover,
        &.router-link-active {
            opacity: 1;
        }

        &.router-link-active:after {
            content: ' ';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: #409eff;
        }
    }

    &-container {
        width: 1140px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 80px;
        border-bottom: 1px solid #e6e6e6;
    }
}
</style>
