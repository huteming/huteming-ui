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
import { getScrollTop, scrollY } from 'web-util/element/src/main'

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
        focus () {
            this.$refs.field.focus()
        },
        blur () {
            this.$refs.field.blur()
        },
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
            // fix：输入框弹起影响的不是滚动区域，而是window
            // this.scrollContainer = getScrollContainer(this.$el, true)
            this.scrollTop = getScrollTop(window)
        },
        handleBlur (event) {
            this.$emit('blur', event)

            // 还原滚动条位置
            scrollY(window, this.scrollTop)
        },
        handleChange (event) {
            this.$emit('change', event.target.value)
        },
    },
}
</script>
