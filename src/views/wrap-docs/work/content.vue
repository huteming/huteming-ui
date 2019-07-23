<template>
<el-scrollbar class="markdown" :wrap-class="$style['scrollable-main']">
    <h1 class="markdown-header">
        <template v-if="isComponent">
            <span>{{ meta.title }}</span>

            <el-button class="markdown-header-icon" circle>
                <i class="iconfont icon-qrcode" style="font-size: 14px;" v-popover:qrcode></i>
            </el-button>

            <el-button id="copy" class="markdown-header-icon" icon="el-icon-edit" circle :data-clipboard-text="examplePath"></el-button>

            <el-popover
                ref="qrcode"
                placement="bottom"
                width="100"
                trigger="hover">
                <img :src="qrcodeImg" alt="" width="100%" height="100%" />
            </el-popover>
        </template>

        <template v-else>
            {{ meta.title }}
        </template>
    </h1>

    <router-view></router-view>
</el-scrollbar>
</template>

<script>
import Qrcode from '@/assets/js/qrcode.js'
import Clipboard from 'clipboard'

export default {
    props: {
        isComponent: Boolean
    },

    data () {
        return {
            qrcodeImg: ''
        }
    },

    computed: {
        meta () {
            return this.$route.meta
        },
        examplePath () {
            const { origin, pathname } = location

            return `${origin}${pathname}#${this.$route.path.replace('docs', 'example')}`
        },
    },

    watch: {
        '$route': {
            handler: 'updateQrcode',
            immediate: true
        }
    },

    mounted () {
        const clipboard = new Clipboard('#copy')

        clipboard.on('success', (e) => {
            // console.info('Action:', e.action)
            // console.info('Text:', e.text)
            // console.info('Trigger:', e.trigger)

            e.clearSelection()
            this.$message.success('示例地址复制成功')
        })

        clipboard.on('error', (e) => {
            // console.error('Action:', e.action)
            // console.error('Trigger:', e.trigger)

            this.$message.error('示例地址复制失败')
        })
    },

    methods: {
        updateQrcode () {
            const qrcodeDom = new Qrcode({
                render: 'canvas',
                text: this.examplePath
            })

            this.qrcodeImg = qrcodeDom.toDataURL('image/jpeg', 1.0)
        },
    }
}
</script>

<style lang="scss" scoped>
.markdown {
    height: 100%;

    &-header {
        display: flex;
        align-items: center;

        &-icon {
            position: relative;
            margin-left: 12px;
            color: #ddd;
            // transition: color .3s;

            // &:hover {
            //     color: #2db7f5;
            // }
        }
    }

    &-container {
        position: relative;
    }
}
</style>

<style lang="scss" module>
.scrollable-main {
    padding: 10px 20px 40px;
    box-sizing: border-box;
    overflow-x: auto;
}
</style>
