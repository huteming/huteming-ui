<template>
<div class="page">
    <tm-range v-model="range7" :min="0" :max="200" :step="2" :bar-height="3" class="spacing">
        <div slot="start">
            <div>线宽</div>
        </div>

        <div slot="end" class="end">value: {{ range7 }}</div>
    </tm-range>
</div>
</template>

<script>
import TmRange from '../index'

export default {
    data () {
        return {
            range1: 0,
            range2: 46,
            range3: 0,

            range4: 0,
            range5: 50,
            range6: 70,

            range7: 300,
        }
    },

    methods: {
        handleChange (value) {
            console.log('change', value)
        }
    },

    components: {
        TmRange,
    }
}
</script>

<style lang="scss" scoped>
.spacing {
    margin-bottom: 15px;
}

.end {
    width: 75px;
    text-align: right;
}
</style>
