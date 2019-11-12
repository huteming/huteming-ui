<template>
<div class="page">
    <tm-cell body="选项">
        <tm-switch v-model="value2" @change="handleChange"></tm-switch>
    </tm-cell>

    <tm-cell body="disabled">
        <tm-switch v-model="value3" disabled></tm-switch>
    </tm-cell>
</div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class DemoSwitch extends Vue {
    value1: boolean = false
    value2: boolean = false
    value3: boolean = true

    handleChange (val: boolean) {
        console.log('change', val)
    }
}
</script>

<style lang="scss" scoped>
</style>
