<template>
<div class="page-docs">
    <header class="header">
        <div class="header-left" @click="visibleNav = !visibleNav">
            <i class="iconfont icon-cell"></i>
        </div>

        <div class="header-middle">tommy-ui</div>

        <div class="header-right"></div>
    </header>

    <main class="container">
        <section class="container-navbar">
            <AppNavbar />
        </section>

        <section class="container-main">
            <AppContent :is-component="isComponent" />
        </section>

        <section class="container-phone" v-show="isComponent">
            <AppPhone />
        </section>
    </main>

    <!-- <base-popup v-model="visibleNav" position="left">
        <AppNavbar />
    </base-popup> -->
</div>
</template>

<script>
import AppNavbar from './work/navbar'
import AppContent from './work/content'
import AppPhone from './work/phone'

export default {
    data () {
        return {
            visibleNav: false,
            domQrnode: null
        }
    },

    computed: {
        isComponent () {
            return !!this.$route.meta.example
        }
    },

    watch: {
        '$route' () {
            this.visibleNav = false
        }
    },

    components: {
        AppNavbar,
        AppPhone,
        AppContent,
    }
}
</script>

<style lang="scss" scoped>
.page-docs {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
}

.header {
    display: none;
    align-items: center;
    height: 40px;
    padding: 0 15px;
    line-height: 40px;
    color: #fff;
    background-color: #108EE9;

    &-left,
    &-right {
        flex: .5;
    }

    &-middle {
        flex: 1;
        text-align: center;
    }
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
    .header {
        display: flex;
    }

    .container {
        &-navbar,
        &-phone {
            display: none;
        }
    }
}
</style>
