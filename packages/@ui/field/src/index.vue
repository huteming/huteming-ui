<template>
<div class="tm-field">
    <input
        v-if="type !== 'textarea'"
        ref="input"
        :class="['tm-field__input', classInput]"
        v-bind="$attrs"
        :type="type"
        :value="nativeInputValue"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
    >

    <textarea
        v-else
        ref="textarea"
        :class="['tm-field__textarea', classInput]"
        :value="nativeInputValue"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        v-bind="$attrs"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        :aria-label="label"
    >
    </textarea>
</div>
</template>

<script>
export default {
    name: 'TmField',

    props: {
        type: {
            type: String,
            default: 'text',
        },
        value: [String, Number],
        label: String,
        classInput: String,
    },

    data () {
        return {
            isOnComposition: false,
        }
    },

    computed: {
        nativeInputValue () {
            return this.value === null || this.value === undefined ? '' : this.value
        },
    },

    mounted () {
    },

    methods: {
        handleComposition (event) {
            if (event.type === 'compositionstart') {
                this.isOnComposition = true
            }
            if (event.type === 'compositionend') {
                this.isOnComposition = false
                this.handleInput(event)
            }
        },
        handleInput (event) {
            if (this.isOnComposition) return

            this.$emit('input', event.target.value)
        },
        handleFocus (event) {
            this.$emit('focus', event)
        },
        handleBlur (event) {
            this.$emit('blur', event)
        },
        handleChange (event) {
            this.$emit('change', event.target.value)
        },
    },
}
</script>

<style lang="scss" scoped>
.tm-field {
    width: 100%;
    display: inline-block;

    &__input {
        width: 100%;
        display: inline-block;
        border: 0;
        outline: 0;
        -webkit-appearance: none;
        background-color: transparent;
        font-size: inherit;
        color: inherit;
        height: 1.41176471em;
        line-height: 1.41176471;
    }

    &__textarea {
        display: block;
        width: 100%;
        border: 0;
        resize: none;
        font-size: 1em;
        line-height: inherit;
        color: inherit;
        outline: 0;
    }
}
</style>
