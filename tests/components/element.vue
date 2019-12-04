<template>
<div class="element" id="element">
    <div class="empty" ref="empty"></div>

    <div id="container" class="container" ref="container" style="width: 100px; height: 100px; overflow: auto;">
        <div class="container-over" ref="over" style="width: 400px; height: 400px;"></div>
    </div>

    <button id="scrollY" ref="scrollY" @click="handleScrollY">scrollY</button>
    <button id="scroll" ref="scroll" @click="handleScroll">scroll</button>

    <div style="height: 120vh;"></div>

    <div class="footer">footer</div>
</div>
</template>

<script>
import { scrollY, scrollTo } from 'packages/ui-element/src/main'

export default {
    methods: {
        handleScrollY () {
            scrollY(this.$refs.container, 20)
        },
        handleScroll () {
            scrollTo(this.$refs.container, 40, 40)
        },
    },
}
</script>
