<template>
<div class="example-input">
    <div style="height: 100vh;"></div>
    <TmInput placeholder="hello world" />
    <div style="height: 100vh;"></div>
</div>
</template>

<script>
import TmInput from '../index.js'

export default {
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
