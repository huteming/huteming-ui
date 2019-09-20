<template>
<div class="page">
    <tm-cell body="选项">
        <tm-switch v-model="value2"></tm-switch>
    </tm-cell>

    <tm-cell body="disabled">
        <tm-switch v-model="value3" disabled></tm-switch>
    </tm-cell>
</div>
</template>

<script>
export default {
    data () {
        return {
            value1: false,
            value2: true,
            value3: true,
        }
    },

    methods: {
        handleChange (val) {
            console.log('change', val)
        },
    },
}
</script>

<style lang="scss" scoped>
</style>
