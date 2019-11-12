<template>
<div class="page">
    <div class="desc">出生年份: {{ year3 }}</div>

    <tm-picker>
        <tm-picker-item :options="yearOptions" v-model="year3"></tm-picker-item>
    </tm-picker>

    <div class="desc">异步options: {{ year1 }}</div>

    <tm-picker>
        <tm-picker-item :options="asyncOptions" v-model="year1"></tm-picker-item>
    </tm-picker>

    <div class="desc">异步value: {{ asyncValue }}</div>

    <tm-picker>
        <tm-picker-item :options="yearOptions" v-model="asyncValue"></tm-picker-item>
    </tm-picker>
</div>
</template>

<script>
export default {
    data () {
        return {
            asyncOptions: [],
            year1: 2019,
            asyncValue: '',
            year3: 20196,
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
        // setInterval(() => {
        //     const next = this.year3 + 1
        //     this.year3 = next > 2027 ? 2018 : next
        // }, 1500)

        setTimeout(() => {
            this.asyncOptions = this.yearOptions
            this.asyncValue = 2020
        }, 1000)
    },
}
</script>

<style lang="scss" scoped>
.desc {
    margin: 10px 0 50px;
}
</style>
