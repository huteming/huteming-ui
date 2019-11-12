<template>
<div class="page">
    <TmPickerRange :visible.sync="visible" :options="asyncOptions" v-model="asyncValue" hello="hello" title="标题" />

    <div class="desc">出生年份: {{ asyncValue[0] }}</div>

    <button @click="visible = true">open</button>

    <tm-divider>空状态</tm-divider>
    <button @click="visibleEmpty = true">open</button>
    <TmPickerRange :visible.sync="visibleEmpty" :options="[[]]" hello="hello" title="优惠券" :image="imgYou" description="暂无优惠券" />
</div>
</template>

<script>
import imgYou from './youhuiquan.png'

export default {
    data () {
        return {
            visible: false,
            asyncOptions: [],
            asyncValue: [],

            visibleEmpty: false,
            imgYou,
        }
    },

    computed: {
        yearOptions () {
            const options = []
            for (let i = 2018; i < 2028; i++) {
                options.push({
                    label: i,
                    value: i
                })
            }
            return [options]
        }
    },

    mounted () {
        setTimeout(() => {
            this.asyncValue = ['2']
            this.asyncOptions = [[
                {
                    label: '1',
                    value: '1',
                },
                {
                    label: '2',
                    value: '2',
                },
                {
                    label: '3',
                    value: '3',
                },
            ]]
        }, 1000)
    },
}
</script>

<style lang="scss" scoped>
.desc {
    margin: 10px 0 50px;
}
</style>
