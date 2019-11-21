<template>
<ul class="nav">
    <li class="nav-container" v-for="(item, index) in maps" :key="index">
        <div class="nav-title">{{ item.title }}</div>

        <ul>
            <li v-for="page in item.modules" :key="page.path">
                <!-- 在路由中约定: link = type + path -->
                <router-link class="nav-text" :to="`/${type}/${page.path}`" tag="div">
                    <span>{{ page.title }}</span>
                </router-link>
            </li>
        </ul>
    </li>
</ul>
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
    padding: 50px 0;
    box-sizing: border-box;

    &-container {
        & + & {
            margin-top: 15px;
        }
    }

    &-title {
        font-size: 16px;
        line-height: 40px;
        color: #333;
        font-weight: 700;
    }

    &-text {
        padding-left: 2px;
        font-size: 14px;
        line-height: 40px;
        color: #444;
        font-weight: 300;
        cursor: pointer;

        &.router-link-active,
        &:hover {
            color: #409eff;
            font-weight: bold;
        }
    }
}
</style>
