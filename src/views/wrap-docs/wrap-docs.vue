<template>
<div class="page-docs">
    <AppHeader />

    <!-- container -->
    <el-scrollbar class="page-component__scroll" ref="componentScrollBar">
        <div class="page-container page-component">
            <el-scrollbar class="page-component__nav">
                <AppNavbar />
            </el-scrollbar>

            <div class="page-component__content">
                <AppContent />
                <router-view class="markdown"></router-view>
            </div>
        </div>
    </el-scrollbar>
</div>
</template>

<script>
import AppNavbar from './work/navbar'
import AppContent from './work/content'
// import AppPhone from './work/phone'
import AppHeader from './work/header'

export default {
    data () {
        return {
            visibleNav: false,
            domQrnode: null
        }
    },

    watch: {
        '$route' () {
            this.visibleNav = false
        }
    },

    components: {
        AppNavbar,
        // AppPhone,
        AppContent,
        AppHeader,
    }
}
</script>

<style lang="scss" scoped>
.page-docs {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
}

.container {
    flex: 1;
    display: flex;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &-navbar {
        flex: 0 0 280px;
    }

    &-main {
        flex: 1;
    }

    &-phone {
        flex: 0 0 550px;
        padding-top: 40px;
    }

    &-header {
        display: none;
    }
}

@media screen and (max-width: 768px) {
    .container {
        &-navbar,
        &-phone {
            display: none;
        }
    }
}
</style>

<style lang="scss">
.page-component__scroll {
    height: calc(100% - 80px);
    margin-top: 80px;

    > .el-scrollbar__wrap {
        overflow-x: auto;
    }
}

.page-component {
    box-sizing: border-box;
    height: 100%;

    &.page-container {
        width: 1140px;
        margin: 0 auto;
        padding: 0;
    }

    .page-component__nav {
        width: 240px;
        position: fixed;
        top: 0;
        bottom: 0;
        margin-top: 80px;
        transition: padding-top .3s;
        > .el-scrollbar__wrap {
            height: 100%;
            overflow-x: auto;
        }
        &.is-extended {
            padding-top: 0;
        }
    }

    .page-component__content {
        padding-left: 270px;
        padding-bottom: 100px;
        box-sizing: border-box;
    }
}
</style>
