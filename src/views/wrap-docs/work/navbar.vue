<template>
<div class="nav">
    <div class="nav-container" v-for="(item, index) in maps" :key="index">
        <div class="nav-title">{{ item.title }}</div>

        <div v-for="page in item.modules" :key="page.path">
            <!-- 在路由中约定: link = type + path -->
            <router-link class="nav-text" :to="`/${type}/${page.path}`" tag="div" exact>
                <span>{{ page.title }}</span>
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import ui from '@/config/ui'
import util from '@/config/util'
import guide from '@/config/guide'

export default {
    data () {
        return {
            util,
        }
    },

    computed: {
        type () {
            return this.$route.meta.type
        },
        maps () {
            switch (this.type) {
            case 'guide':
                return guide
            case 'component':
                return ui
            case 'function':
                return util
            default:
                return []
            }
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
        font-size: 16px;
        line-height: 40px;
        color: #a0a0a0;
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
            font-weight: bold;
        }
    }
}
</style>
