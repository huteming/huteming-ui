<template>
<div :class="[type === 'textarea' ? 'tm-textarea' : 'tm-input']">
    <input
        v-if="type !== 'textarea'"
        ref="input"
        :tabindex="tabindex"
        :class="['tm-input__inner', classInput]"
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
        :tabindex="tabindex"
        :class="['tm-textarea__inner', classInput]"
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
import animation from 'web-util/animation/index.js'

export default {
    name: 'TmInput',

    props: {
        type: {
            type: String,
            default: 'text'
        },
        tabindex: String,
        value: [String, Number],
        label: String,
        classInput: String,
    },

    data () {
        return {
            isOnComposition: false,
            focused: false,
            scrollTop: 0,
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
            // if (event.type === 'compositionstart') {
            //     this.isOnComposition = true
            // }
            // if (event.type === 'compositionend') {
            //     this.isOnComposition = false
            //     this.handleInput(event)
            // }
        },
        handleInput (event) {
            // if (this.isOnComposition) return

            // hack for https://github.com/ElemeFE/element/issues/8548
            // should remove the following line when we don't support IE
            // if (event.target.value === this.nativeInputValue) return
            // alert(event.target.value)
            this.$emit('input', event.target.value)

            // set input's value, in case parent refuses the change
            // see: https://github.com/ElemeFE/element/issues/12850
            // this.$nextTick(() => {
            //     this.$refs.input.value = this.value
            // })
        },
        handleFocus (event) {
            this.focused = true
            this.originScrollTop = document.documentElement.scrollTop || document.body.scrollTop

            this.$emit('focus', event)
        },
        handleBlur (event) {
            this.focused = false
            const targetScrollTop = document.documentElement.scrollTop || document.body.scrollTop

            animation.easeOut(targetScrollTop, this.originScrollTop, (scrollTop) => {
                window.scrollTo(0, scrollTop)
            })

            this.$emit('blur', event)
        },
        handleChange (event) {
            this.$emit('change', event.target.value)
        },
    },
}
</script>

<style lang="scss" scoped>
.tm-textarea,
.tm-input {
    width: 100%;
    display: inline-block;
}

.tm-input__inner,
.tm-textarea__inner {
    width: 100%;
    display: inline-block;
    font-size: inherit;
    border: 1px solid transparent;
    background-color: transparent;
    background-image: none;
    -webkit-appearance: none;
    outline: none;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    box-sizing: border-box;
}
</style>
