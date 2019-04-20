<template>
<div class="page">
    <TmPickerRange :visible.sync="visible" :options="yearOptions" v-model="yearCurrent" />

    <div class="desc">出生年份: {{ yearCurrent[0] }}</div>

    <button @click="visible = true">open</button>
</div>
</template>

<script>
import TmPickerRange from 'web-ui/picker-range/index.js'

export default {
    data () {
        return {
            visible: false,
            yearCurrent: [2018],
            yearCurrent2: [2019, 2020],
            year3: [2020],
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
        // setInterval(() => {
        //     const next = [this.year3] + 1
        //     this.year3 = next > 2027 ? [2018] : [next]
        // }, 1500)
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
