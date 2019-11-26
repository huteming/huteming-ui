<template>
<div class="page-demo">
    <button v-anchor="{ selector: '#target', container: '.basic2', top: 40 }">点击</button>

    <div class="basic2">
        <pre style="height: 120vh;"></pre>

        <div id="target">看到我啦</div>

        <pre style="height: 120vh;"></pre>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
        }
    },

    created () {
    },

    mounted () {
    },

    methods: {
    },
}
</script>

<style lang="scss" scoped>
.basic2 {
    // position: relative;
    height: 50vh;
    overflow: auto;
    background: lightblue;
}
</style>
