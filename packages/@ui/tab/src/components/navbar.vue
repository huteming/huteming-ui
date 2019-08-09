<template>
<div class="tm-tab-navbar">
    <slot></slot>
</div>
</template>

<script>
export default {
    props: {
        value: String,
        grow: Number,
    },

    data () {
        return {
        }
    },

    mounted () {
    },
}
</script>
