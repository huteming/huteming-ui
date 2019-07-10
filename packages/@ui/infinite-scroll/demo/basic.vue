<template>
<div class="page">
    <div class="container" v-infinite-scroll="{ callback: handleReachBottom, disabled }">
        <div class="item" v-for="item in lists" :key="item">{{ item }}</div>
    </div>

    <button @click="disabled = !disabled">disabled: {{ disabled }}</button>

    <button @click="handleEmit">手动触发事件</button>
</div>
</template>

<script>
import InfiniteScroll from '../index'
import Toast from 'web-ui/toast/index'

export default {
    data () {
        return {
            // lists: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
            // lists: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            lists: [1, 2, 3, 4, 5],
            loading: false,
            disabled: false,
        }
    },

    methods: {
        handleReachBottom (done) {
            Toast('reach')
            setTimeout(() => {
                const length = this.lists.length
                for (let i = 1; i < 15; i++) {
                    this.lists.push(length + i)
                }
                done()
            }, 2000)
        },
        handleEmit () {
            Toast('emit')
            this.$emit('infinite-scroll')
        }
    },

    directives: {
        InfiniteScroll
    }
}
</script>

<style lang="scss" scoped>
.btn {
    position: absolute;
    top: 40px;
    left: 40px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    background: #f6f6f6;
}

.item {
    height: 45px;
    font-size: 15px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #f6f6f6;
}

.container {
    position: relative;
    height: 400px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
</style>
