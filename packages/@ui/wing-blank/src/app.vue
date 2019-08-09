<template>
<div :class="classes">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'TmWingBlank',

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
            return ['tm-wing', `tm-wing-${this.size}`]
        },
    },
}
</script>
