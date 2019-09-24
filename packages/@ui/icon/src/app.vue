<template>
<i class="tm-icon" :class="classes"></i>
</template>

<script>
export default {
    name: 'TmIcon',

    props: {
        icon: {
            type: String,
            required: true,
        },
    },

    computed: {
        classes () {
            return `tm-icon-${this.icon}`
        },
    },
}
</script>
