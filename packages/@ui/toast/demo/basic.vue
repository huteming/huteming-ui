<template>
<div class="page-example">
    <button @click="handle1">normal</button>
    <button @click="handle2">timeout 1s</button>
    <button @click="handle5">vnode</button>
    <button @click="handlePosition">位置</button>
    <button @click="handle7">长文字</button>
    <button @click="handle3">{{ instance ? '关闭' : '打开' }}</button>
</div>
</template>

<script>
import Toast from '../index'

export default {
    data () {
        return {
            instance: null
        }
    },

    methods: {
        handle1 () {
            Toast('hello normal')
        },
        handle2 () {
            Toast('timeout 1s', 1000)
        },
        handle3 () {
            if (!this.instance) {
                this.instance = Toast('这个需要手动关闭', 0, {
                    onClose () {
                        console.log('close')
                    },
                })
            } else {
                this.instance.close()
                this.instance = null
            }
        },
        handle5 () {
            Toast(`<strong>这是 <i>HTML</i> 片段</strong>`)
        },
        handle7 () {
            Toast('很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字')
        },
        handlePosition () {
            Toast('提示信息', { position: 'top' })
        },
    },
}
</script>

<style lang="scss" module>
</style>
