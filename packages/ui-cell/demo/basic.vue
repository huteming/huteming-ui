<template>
<div class="example-input">
    <TmInput v-model="value1" placeholder="hello world" @focus="handleLog('force')" @blur="handleLog('blur')" @change="handleLog('change')" />
</div>
</template>

<script>
import TmInput from '../index.js'

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
    },
}
</script>

<style lang="scss" scoped>
.example-input {
    background-color: #f6f6f6;
}
</style>
