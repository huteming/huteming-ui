<template>
<div class="tm-tab-container" v-show="active">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'TmTabContainer',

    props: {
        name: {
            type: String,
            required: true
        }
    },

    data () {
        return {
        }
    },

    computed: {
        active () {
            return this.$parent.swiping || this.$parent.value === this.name
        },
    },

    methods: {
    },
}
</script>
