<template>
<div class="tm-field">
    <input
        v-if="type !== 'textarea'"
        ref="field"
        class="tm-field__input"
        :style="inputStyle"
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
        ref="field"
        class="tm-field__textarea"
        :style="inputStyle"
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
import { getScrollContainer, getScrollTop, scrollY } from 'web-util/element/src/main'

export default {
    name: 'TmField',

    props: {
        type: {
            type: String,
            default: 'text',
        },
        value: [String, Number],
        label: String,
        inputStyle: Object,
    },

    data () {
        return {
            isOnComposition: false,
            scrollTop: -1,
            scrollContainer: null,
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

            // 记录当前滚动条位置
            this.scrollContainer = getScrollContainer(this.$el, true)
            if (this.scrollContainer) {
                this.scrollTop = getScrollTop(this.scrollContainer)
            }
        },
        handleBlur (event) {
            this.$emit('blur', event)

            // 还原滚动条位置
            this.scrollTop > -1 && scrollY(this.scrollContainer, this.scrollTop)
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
        display: inline-block;
        height: 1.41176471em;
        -webkit-appearance: none;
    }

    &__textarea {
        display: block;
        resize: none;
    }

    &__input,
    &__textarea {
        width: 100%;
        margin: 0;
        padding: 0;
        font-size: inherit;
        line-height: 1.41176471;
        color: inherit;
        background-color: transparent;
        border: 0;
        outline: 0;
        -webkit-tap-highlight-color: transparent;
    }

    @include placeholder {
        margin: 0;
        padding: 0;
        color: rgba(178, 186, 196, 1);
    }
}
</style>
