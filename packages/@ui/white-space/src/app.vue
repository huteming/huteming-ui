<template>
<div :class="classes">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'TmWhiteSpace',

    props: {
        size: {
            type: String,
            default: 'md',
            validator (val) {
                return ['xs', 'sm', 'md', 'lg', 'xl'].includes(val)
            },
        },
    },

    computed: {
        classes () {
            return ['tm-white', `tm-white-${this.size}`]
        },
    },
}
</script>
