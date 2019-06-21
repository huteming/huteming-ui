<template>
<div class="basic">
    <div id="btn1" v-anchor="{ selector: '#target', container: '.basic2' }">锚点</div>
    <div id="btn3" v-anchor="{ selector: '#target', container: '.basic2', top: 20 }">锚点</div>

    <div id="container" class="basic2" ref="container">
        <pre style="height: 120vh;"></pre>

        <div id="target">看到我啦</div>
        <div id="btn2" v-anchor="{ selector: '#target' }">锚点</div>

        <pre style="height: 120vh;"></pre>
    </div>
</div>
</template>

<script>
import Anchor from 'web-ui/anchor/src/anchor'

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

    directives: {
        Anchor,
    },
}
</script>

<style lang="scss" scoped>
.basic {
}
.basic2 {
    // position: relative;
    height: 50vh;
    overflow: auto;
    background: lightblue;
}
</style>
