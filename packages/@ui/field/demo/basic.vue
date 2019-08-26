<template>
<div class="demo">
    <button @click="visible = true">hello</button>
    <div class="demo-header">表单</div>

    <tm-cell title="qq">
        <TmInput ref="field" v-model="value1" placeholder="请输入qq号" @focus="handleLog('force')" @blur="handleLog('blur')" @change="handleLog('change')" />
    </tm-cell>

    <tm-cell title="手机号">
        <TmInput v-model="value1" placeholder="请输入手机号" />

        <div class="demo-tip1" slot="tip">获取验证码</div>
    </tm-cell>

    <div class="demo-footer">底部说明文字</div>
    <div class="demo-header">文本框</div>

    <tm-cell>
        <TmInput v-model="value1" placeholder="请输入文本" />
    </tm-cell>

    <div class="demo-header">文本域</div>

    <tm-cell>
        <TmInput type="textarea" rows="3" v-model="value1" placeholder="请输入文本" @blur="handleBlur" />
    </tm-cell>

    <div class="demo-header">选择</div>

    <tm-cell title="国家/地区" description="中国" link>
    </tm-cell>

    <div style="height: 100vh;"></div>

    <tm-divider>到底了</tm-divider>

    <tm-popup v-model="visible" position="bottom">
        <tm-cell title="qq">
            <TmInput type="textarea" rows="4" v-model="value1" placeholder="请输入qq号" @focus="handleLog('force')" @blur="handleLog('blur')" @change="handleLog('change')" />
        </tm-cell>

        <div class="demo-submit" @click="handleSubmit">提交</div>
    </tm-popup>
</div>
</template>

<script>
import TmInput from '../index'
import TmCell from 'web-ui/cell/index'

export default {
    data () {
        return {
            value1: '',
            visible: false,
        }
    },

    watch: {
        value1 (val) {
            console.log('watch', val, val.indexOf('\n'))
        },
    },

    mounted () {
    },

    methods: {
        handleBlur () {
        },
        handleSubmit () {
            this.$message('hello')
        },
        handleLog (action, ...args) {
            console.log(action)
            // console.log('args', ...args)
        },
    },

    components: {
        TmInput,
        TmCell,
    },
}
</script>

<style lang="scss" scoped>
.demo {
    min-height: 100vh;
    background-color: #f6f6f6;

    &-submit {
        width: 3.76rem;
        height: .88rem;
        margin: 0 auto;
        font-size: .32rem;
        line-height: .88rem;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        background: linear-gradient(126deg,rgba(46,166,254,1) 0%,rgba(144,226,254,1) 100%);
        border-radius: .44rem;
        box-sizing: border-box;
    }

    &-tip1 {
        height: rem(47);
        padding: 0 rem(20.4) 0 rem(24);
        font-size: rem(34);
        line-height: rem(47);
        color: #576B95;
        box-sizing: content-box;
    }

    &-header {
        padding: rem(32) rem(32) rem(6) rem(32);
        font-size: rem(28);
        line-height: 1.4;
        color: rgba(0, 0, 0, 0.5);
        background: #ededed;
    }

    &-footer {
        padding: rem(8.4) rem(32) 0 rem(32);
        font-size: rem(28);
        color: rgba(0, 0, 0, 0.5);
        background: #ededed;
    }
}
</style>
