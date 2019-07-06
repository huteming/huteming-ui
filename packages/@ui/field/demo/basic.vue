<template>
<div class="demo">
    <div class="demo-header">表单</div>

    <tm-cell title="qq">
        <TmInput v-model="value1" placeholder="请输入qq号" @focus="handleLog('force')" @blur="handleLog('blur')" @change="handleLog('change')" />
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
        <TmInput type="textarea" rows="3" v-model="value1" placeholder="请输入文本" />
    </tm-cell>

    <div class="demo-header">选择</div>

    <tm-cell title="国家/地区" description="中国" link>
    </tm-cell>

    <tm-divider>到底了</tm-divider>
</div>
</template>

<script>
import TmInput from '../index'
import TmCell from 'web-ui/cell/index'

export default {
    data () {
        return {
            value1: '',
        }
    },

    watch: {
        value1 (val) {
            console.log('watch', val)
        },
    },

    methods: {
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
