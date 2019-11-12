import { errorHandler } from 'tommy/utils/custom_error'
import { tool } from '@huteming/util'

export default {
    data () {
        return {
            $_readerStart: 0,
        }
    },

    mounted () {
        this.$_saveStartTime()
        this.$_checkLastReadTime()
        this.$_addListener()
    },

    async beforeDestroy () {
        this.$_removeListener()
        await this.$_statReadTime(this.$_getReadTime())
    },

    methods: {
        // 保存开始时间
        $_saveStartTime () {
            this.$_readerStart = Date.now()
        },
        // 计算获取阅读时间
        $_getReadTime () {
            if (this.$_readerStart <= 0) {
                errorHandler(new Error('计算停留时长错误: 未找到开始时间'))
                return 0
            }
            return parseInt((Date.now() - this.$_readerStart) / 1000)
        },
        // 检查统计上次停留时间
        async $_checkLastReadTime () {
            const readTime = parseInt(window.localStorage.getItem('reader_time')) || 0
            await this.$_statReadTime(readTime)
        },
        // 保存阅读时长到缓存, 等待下次进入页面时保存
        $_cacheReadTime (time) {
            const cache = parseInt(window.localStorage.getItem('reader_time')) || 0
            window.localStorage.setItem('reader_time', time + cache)
        },
        $_removeCache () {
            window.localStorage.removeItem('reader_time')
        },
        // 监听 beforeunload 事件
        $_addListener () {
            this.$_readerListener = () => {
                this.$_removeListener()
                this.$_cacheReadTime(this.$_getReadTime())
            }
            this.$_readerEvent = tool.isAndroid() ? 'unload' : 'pagehide'
            window.addEventListener(this.$_readerEvent, this.$_readerListener)
        },
        // 移除 beforeunload 事件
        $_removeListener () {
            window.removeEventListener(this.$_readerEvent, this.$_readerListener)
        },
        // 统计阅读时长
        async $_statReadTime (readTime) {
            if (readTime <= 0) {
                return
            }
            const params = {
                relationID: this.productID,
                readTime: readTime,
            }
            try {
                await this.$tools.post('/api/system/statPageReadtime', params)
                this.$_removeCache()
            } catch (err) {
                errorHandler(new Error(`统计阅读时长错误: ${err.message}`))
                this.$_cacheReadTime(readTime)
            }
        },
    },
}
