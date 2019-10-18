<template>
<div class="page">
    <button @click="handleCinfig">config</button>
    <button @click="handleAlert">alert</button>
    <button @click="handleConfirm">confirm</button>
    <button @click="handlePrompt">prompt</button>
    <button @click="handleVNode">VNode</button>
</div>
</template>

<script>
import Message from '../index'
import Toast from 'web-ui/toast/index'

export default {
    data () {
        return {
            num: 1,
        }
    },

    mounted () {
    },

    computed: {
        domVNode: {
            cache: false,
            get () {
                console.log('get')
                const { num, handleInput, handleAdd, handleDecrease } = this
                return (
                    <div class="vnode">
                        <tm-flex class="vnode-field">
                            <div class="vnode-decrease" onClick={ handleDecrease }>-</div>
                            <tm-flex-item class="vnode-input">
                                <TmField value={ num } onInput={ handleInput } input-style={ { 'text-align': 'center' } } />
                            </tm-flex-item>
                            <tm-flex-item class="vnode-add" nativeOnClick={ handleAdd }>+</tm-flex-item>
                        </tm-flex>

                        <div class="vnode-tip">（VIP学习卡每次只能赠送一张）</div>
                    </div>
                )
            },
        },
    },

    methods: {
        handleInput (num) {
            this.num = num
            console.log(num)
        },
        handleAdd () {
            console.log('add')
            this.num++
        },
        handleDecrease () {
            console.log('de')
            this.num--
        },
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
                    Toast('已关闭')
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
            Message.confirm(this.domVNode)
        },
        getVNode () {
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
