<template>
<div class="vnode" :key="key">
    <tm-flex class="vnode-field">
        <div class="vnode-decrease" @click="handleDecrease">-</div>
        <tm-flex-item class="vnode-input">
            <TmField :value="state.num" :input-style="{ 'text-align': 'center' }" />
        </tm-flex-item>
        <tm-flex-item class="vnode-add" @click.native="handleAdd">+</tm-flex-item>
    </tm-flex>

    <div class="vnode-tip">（VIP学习卡每次只能赠送一张）</div>
</div>
</template>

<script>
import store from './store'

export default {
    data () {
        return {
            num: 1,
            state: store.state,
            key: Math.random()
        }
    },

    methods: {
        handleInput (num) {
            store.state.num = num
        },
        handleAdd () {
            console.log('add')
            store.state.num++
        },
        handleDecrease () {
            console.log('de')
            store.state.num--
        },
    },
}
</script>

<style lang="scss" scoped>
.vnode {
    &-input {
        width: 2.3rem;
        height: .8rem;
        padding: .14rem .2rem;
        font-size: .36rem;
        color: #202631;
        box-sizing: border-box;
        border-top: 1px solid #E4E4E4;
        border-bottom: 1px solid #E4E4E4;
    }

    &-decrease,
    &-add {
        width: .8rem;
        height: .8rem;
        font-size: .4rem;
        line-height: .8rem;
        color: #E4E4E4;
        text-align: center;
        border: 1px solid #E4E4E4;
        box-sizing: border-box;
    }

    &-tip {
        margin-top: .24rem;
        font-size: .24rem;
        line-height: .32rem;
        color: #FF6878;
    }
}
</style>
