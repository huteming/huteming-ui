<template>
<div class="nav">
    <div class="nav-container" v-for="(item, index) in sideGroup" :key="index">
        <div class="nav-title">{{ item.sideTitle }}</div>

        <div v-for="page in item.children" :key="page.path">
            <!-- 在路由中约定: link = type + path -->
            <router-link class="nav-text" :to="`/${type}/${page.childPath}`" tag="div" exact>
                <span>{{ page.chineseName }}</span>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import config from 'src/config'

export default {
    data () {
        return {
        }
    },

    computed: {
        type () {
            return this.$route.meta.type
        },
        sideGroup () {
            const side = config.find(item => item.rootPath === this.type)

            return side.sideGroup || []
        },
    }
}
</script>

<style lang="scss" scoped>
.nav {
    height: 100%;
    padding: 30px 10px 50px 30px;
    box-sizing: border-box;

    &-container {
        & + & {
            margin-top: 15px;
        }
    }

    &-title {
        font-size: 12px;
        line-height: 40px;
        color: rgba(69, 90, 100, 0.6);
        // font-weight: 700;
    }

    &-text {
        display: block;
        padding-left: 2px;
        font-size: 14px;
        line-height: 40px;
        color: #455a64;
        font-weight: 300;
        cursor: pointer;
        transition: all 150ms;

        &.router-link-active,
        &:hover {
            // color: #409eff;
            color: #000;
            font-weight: bold;
        }
    }
}
</style>
