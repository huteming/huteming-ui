<template>
<div class="example-address">
    <div>{{ valuesText }}</div>
    <div>{{ values }}</div>
    <TmPickerAddress :visible.sync="visible" v-model="values" :value-text.sync="valuesText" />
    <button @click="visible = true">open</button>
</div>
</template>

<script>
import TmPickerAddress from '../index'

export default {
    data () {
        return {
            visible: false,

            values: [],
            valuesText: [],
        }
    },

    components: {
        TmPickerAddress,
    },
}
</script>
