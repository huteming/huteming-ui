<template>
<label class="tm-switch" :class="disabled ? 'disabled' : ''">
    <input class="tm-switch-input" type="checkbox" :disabled="disabled" v-model="currentValue" />
    <div class="tm-switch-core"></div>
</label>
</template>

<script>
export default {
    name: 'TmSwitch',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
    },

    data () {
        return {
            currentValue: this.value
        }
    },

    computed: {
    },

    watch: {
        value (val) {
            this.currentValue = val
        },
        currentValue (val) {
            this.$emit('input', val)
            this.$emit('change', val)
        },
    },

    methods: {
    },
}
</script>
