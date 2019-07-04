<template>
<div class="page">
    <TmPickerRange :visible.sync="visible" :options="asyncOptions" v-model="asyncValue" hello="hello" title="标题" />

    <div class="desc">出生年份: {{ asyncValue[0] }}</div>

    <button @click="visible = true">open</button>

    <tm-divider>空状态</tm-divider>
    <button @click="visibleEmpty = true">open</button>
    <TmPickerRange :visible.sync="visibleEmpty" :options="[[]]" hello="hello" title="标题" description="empty" />
</div>
</template>

<script>
import TmPickerRange from 'web-ui/picker-range/index.js'

export default {
    data () {
        return {
            visible: false,
            asyncOptions: [],
            asyncValue: [],

            visibleEmpty: false,
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

    components: {
        TmPickerRange,
    },
}
</script>

<style lang="scss" scoped>
.desc {
    margin: 10px 0 50px;
}
</style>
