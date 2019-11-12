<template>
<div class="demo">
    <tm-divider>expand1</tm-divider>
    <button @click="expand1 = !expand1">expand1: {{ expand1 }}</button>
    <tm-transition-collapse>
        <div class="container" key="1" v-show="expand1">
            <div class="block"></div>
            <div class="block"></div>
        </div>
    </tm-transition-collapse>

    <tm-divider>expand2:</tm-divider>
    <button @click="expand2 = !expand2">expand2: {{ expand2 }}</button>
    <tm-transition-collapse>
        <div class="container" key="3">
            <div class="block"></div>
        </div>
        <div class="container" key="4" v-show="expand2">
            <div class="block"></div>
        </div>
        <div class="container" key="5">
            <div class="block"></div>
        </div>
    </tm-transition-collapse>
</div>
</template>

<script>
export default {
    data () {
        return {
            expand1: false,
            expand2: false,
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
    overflow: auto;

    & + & {
        margin-top: 20px;
    }
}

.block {
    height: 200px;
    background: #409eff;

    & + & {
        margin-top: 20px;
    }
}
</style>
