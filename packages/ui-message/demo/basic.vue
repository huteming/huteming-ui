<template>
<div class="page-demo">
    <button @click="handleCinfig">config</button>
    <button @click="handleAlert">alert</button>
    <button @click="handleConfirm">confirm</button>
    <button @click="handlePrompt">prompt</button>
    <button @click="handleVNode">VNode</button>
    <button @click="handleComponent">component</button>
</div>
</template>

<script>
import Message from '../src/main'
import domVNode from './vnode.vue'
import Vue from 'vue'
import store from './store'

export default {
    data () {
        return {
            state: store.state,
        }
    },

    mounted () {
    },

    methods: {
        handleCinfig () {
            Message({
                title: 'Welcome',
                message: '欢迎使用 Ant Design ！！',

                confirmButtonText: '知道了',
                confirmButtonHighlight: true,

                showCancelButton: true,
                cancelButtonText: 'cancel',
                cancelButtonHighlight: true,

                showInput: true,
                inputType: 'password',
                inputValue: 'password',
                inputPlaceholder: 'password',

                beforeConfirm (done, data) {
                    console.log('beforeConfirm', data)
                    setTimeout(done, 500)
                },
                beforeCancel (done, data) {
                    console.log('beforeCancel', data)
                    setTimeout(done, 500)
                },
                beforeClose (done, data) {
                    console.log('beforeClose', data)
                    setTimeout(done, 500)
                },
                closeOnClickModal: true,
            })
                .then(res => {
                    console.log(res)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        handleAlert () {
            const options = {
                beforeClose: (done) => {
                    Message.confirm('确定执行此操作?')
                        .then(done)
                        .catch(res => {
                        })
                },
            }
            Message.alert(`
                <img src="http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg" width="100" height="100" />
            `, '', options)
                .then(res => {
                    console.log('已关闭')
                })
        },
        handleConfirm () {
            Message.confirm('确定执行此操作?确定执行此操作?确定执行此操作?确定执行此操作?确定执行此操作?确定执行此操作?确定执行此操作?')
                .then(res => {
                    console.log(res)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        handlePrompt () {
            Message.prompt('', '请输入')
                .then(res => {
                    console.log(res)
                })
                .catch(res => {
                    console.log(res)
                })
        },
        handleVNode () {
            // Vue.component('vnode', domVNode)
            // const vnode = Vue.component('vnode')
            const h = this.$createElement
            Message.confirm(h(domVNode))
                .then(() => {
                    console.log('confirm', this.state.num)
                })
        },
        handleComponent () {
            Message.confirm(domVNode)
        },
    },
}
</script>
