<template>
<h1 class="markdown-header">
    <span>{{ meta.title }}</span>

    <template v-if="isComponent">
        <el-button class="markdown-header-icon" circle v-popover:qrcode>
            <i class="tm-icon tm-icon-qrcode"></i>
        </el-button>

        <el-tooltip effect="dark" content="复制示例链接" placement="bottom">
            <el-button id="copy" class="markdown-header-icon" icon="el-icon-edit" circle :data-clipboard-text="examplePath"></el-button>
        </el-tooltip>

        <el-popover
            ref="qrcode"
            placement="bottom"
            width="100"
            trigger="hover">
            <div class="markdown-header-qrcode-tips">手机扫码体验</div>
            <img :src="qrcodeImg" alt="" class="img-block" />
        </el-popover>
    </template>
</h1>
</template>

<script>
import Qrcode from '@/assets/js/qrcode.js'
import Clipboard from 'clipboard'

export default {
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
            const { childPath } = this.$route.meta

            return `${origin}${pathname}#/example/${childPath}`
        },
        isComponent () {
            return !!this.$route.meta.example
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
.markdown-header {
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

    &-qrcode {
        &-tips {
            margin-bottom: 4px;
            color: #34495e;
            text-align: center;
        }
    }
}
</style>
