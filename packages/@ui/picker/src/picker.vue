<template>
<section class="tm-picker">
    <div class="tm-picker-container">
        <slot></slot>
    </div>
</section>
</template>

<script>
export default {
    name: 'TmPicker'
}
</script>

<style lang="scss" scoped>
.tm-picker {
    width: 100%;

    &-container {
        display: flex;
    }
}
</style>
