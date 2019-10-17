<template>
<h1 class="content">
    <template v-if="isComponent">
        <span>{{ meta.title }}</span>

        <el-button class="content-icon" circle>
            <TmIcon icon="qrcode" v-popover:qrcode />
        </el-button>

        <el-button id="copy" class="content-icon" icon="el-icon-edit" circle :data-clipboard-text="examplePath"></el-button>

        <el-popover
            ref="qrcode"
            placement="bottom"
            width="100"
            trigger="hover">
            <img :src="qrcodeImg" alt="" width="100%" height="100%" />
        </el-popover>
    </template>

    <template v-else>
        <span>{{ meta.title }}</span>
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

            return `${origin}${pathname}#${this.$route.path.replace('docs', 'example')}`
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
.content {
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
</style>
