<template>
<el-scrollbar class="scrollable" wrap-style="overflow-X: auto;" :native="false">
    <ul class="nav">
        <li class="nav-item">
            <router-link class="nav-spacing-1" :to="{ path: '/docs/quickstart' }">Quickstart</router-link>
        </li>

        <!-- util -->
        <li class="nav-item-container">
            <div class="nav-item nav-item-title nav-spacing-1">Util</div>

            <ul class="nav">
                <li class="nav-item" v-for="item in util" :key="item.path">
                    <router-link class="nav-spacing-2" :to="`/docs/${item.path}`">
                        <span class="name">{{ item.title }}</span>
                    </router-link>
                </li>
            </ul>
        </li>

        <!-- components -->
        <li class="nav-item-container">
            <div class="nav-item nav-item-title nav-spacing-1">Components</div>

            <ul class="nav" v-for="group in components" :key="group.title">
                <li class="nav-item-container">
                    <div class="nav-item nav-item-subtitle nav-spacing-2">{{ group.title }}</div>

                    <ul class="nav">
                        <li class="nav-item" v-for="item in group.list" :key="item.path">
                            <router-link class="nav-spacing-3" :to="`/docs/${item.path}`">
                                <span class="name">{{ item.title }}</span>
                            </router-link>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
</el-scrollbar>
</template>

<script>
import ui from '@/config/ui'
import util from '@/config/util'

export default {
    data () {
        return {
            util,
        }
    },

    computed: {
        components () {
            const res = []

            Object.keys(ui).forEach(title => {
                res.push({
                    title,
                    list: ui[title].filter(item => !!item.example),
                })
            })

            return res
        },
    }
}
</script>

<style lang="scss" scoped>
.scrollable {
    height: 100%;
    padding: 42px 0;
    background-color: #f9fafb;
    box-sizing: border-box;
}

.nav {
    height: 100%;
    font-size: 14px;
    line-height: 40px;
    box-sizing: border-box;

    &-item {
        &-title {
            color: rgba(0, 0, 0, 0.85);
            font-weight: bold;
        }

        &-subtitle {
            color: rgba(0, 0, 0, 0.45);
        }

        > a {
            display: block;
            height: 40px;
            color: rgba(0, 0, 0, 0.65);
            transition: color .3s ease;
            box-sizing: border-box;

            &.router-link-active,
            &:hover {
                color: #1890ff;
            }

            &.router-link-active {
                border-right: 3px solid #1890ff;
                background-color: #e6f7ff;
            }
        }

        .name {
            font-size: 12px;
            margin-left: 6px;
            font-weight: normal;
            opacity: .67;
        }

        &.is-active {
            color: #4078c0;
            border-right: 2px solid;
        }
    }

    &-spacing {
        &-1 {
            padding-left: 25px;
        }

        &-2 {
            padding-left: 50px;
        }

        &-3 {
            padding-left: 75px;
        }
    }
}
</style>
