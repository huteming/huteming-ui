<template>
<div class="basic">
    <div v-anchor="{ selector: '#target', container: '.basic2', top: 40 }">锚点</div>

    <div class="basic2">
        <pre style="height: 120vh;"></pre>

        <div id="target">看到我啦</div>

        <pre style="height: 120vh;"></pre>
    </div>
</div>
</template>

<script>
import Anchor from '../index'

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
        onObserve (visible) {
            console.log('visible', visible)
        },
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
