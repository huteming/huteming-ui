<template>
<div class="page">
    <tm-picker>
        <tm-picker-item :options="asyncOptions" v-model="asyncValue"></tm-picker-item>
    </tm-picker>

    <tm-picker>
        <tm-picker-item :options="yearOptions" v-model="yearCurrent"></tm-picker-item>
    </tm-picker>

    <div class="desc">出生年份: {{ yearCurrent }}</div>

    <tm-picker>
        <tm-picker-item :options="yearOptions" v-model="year1"></tm-picker-item>
        <tm-picker-item :options="yearOptions" v-model="year2"></tm-picker-item>
    </tm-picker>

    <div class="desc">{{ year1 }} ~ {{ year2 }}</div>

    <tm-picker>
        <tm-picker-item :options="yearOptions" v-model="year3"></tm-picker-item>
    </tm-picker>

    <div class="desc">动态设置: {{ year3 }}</div>
</div>
</template>

<script>
import Picker from '../index.js'
import PickerItem from 'web-ui/picker-item/index.js'

export default {
    data () {
        return {
            asyncOptions: [],
            asyncValue: 2019,
            yearCurrent: 20196,
            year1: 2019,
            year2: 2020,
            year3: 2020
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
            return options
        }
    },

    mounted () {
        setInterval(() => {
            const next = this.year3 + 1
            this.year3 = next > 2027 ? 2018 : next
        }, 1500)

        setTimeout(() => {
            this.asyncOptions = this.yearOptions
        }, 1000)
    },

    components: {
        TmPicker: Picker,
        TmPickerItem: PickerItem,
    },
}
</script>

<style lang="scss" scoped>
.desc {
    margin: 10px 0 50px;
}
</style>
