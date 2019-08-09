<template>
<div class="tm-pay">
    <div class="tm-pay-container" v-if="!btnOnly">
        <div class="tm-pay-prefix">{{ normalizedPrefix }}</div>

        <div :class="[typeof title === 'number' ? 'tm-pay-price' : 'tm-pay-title']" :style="titleStyle">
            <slot name="title">{{ title | fixed(2, true) }}</slot>
        </div>

        <div class="tm-pay-group">
            <div class="tm-pay-tip" :class="{ 'through': tipThrough }" :style="tipStyle">
                <slot name="tip">{{ tip }}</slot>
            </div>
            <div class="tm-pay-desc" :class="{ 'through': descThrough }" :style="descStyle">
                <slot name="desc">{{ desc }}</slot>
            </div>
        </div>
    </div>

    <div class="tm-pay-btn" :style="normalizedBtnStyle" @click.stop="handleClick">
        <slot name="btn">{{ btn }}</slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'TmBtnPay',

    props: {
        title: [String, Number],
        titlePrefix: String,
        titleStyle: Object,
        tip: String,
        tipStyle: Object,
        tipThrough: Boolean,
        desc: String,
        descStyle: Object,
        descThrough: Boolean,
        btn: String,
        btnStyle: {
            type: Object,
            default () {
                return {}
            },
        },
        btnOnly: Boolean,
        disabled: Boolean,
    },

    computed: {
        normalizedPrefix () {
            if (typeof this.title === 'number' && this.titlePrefix === undefined) {
                return '￥'
            }
            return this.titlePrefix
        },
        normalizedBtnStyle () {
            const _style = {}

            // 只显示按钮时，默认没有圆角
            if (this.btnOnly) {
                _style['border-radius'] = 0
            }
            if (this.disabled) {
                _style['background'] = 'rgba(201,204,212,1)'
            }

            return Object.assign(_style, this.btnStyle)
        },
    },

    methods: {
        handleClick () {
            if (this.disabled) {
                return false
            }
            this.$emit('click')
        },
    },

    filters: {
        fixed (value, digits, toNumber) {
            if (typeof value === 'string') {
                return value
            }
            const _value = Number(value)

            if (isNaN(_value)) {
                return ''
            }

            const hasPoint = _value.toString().split('.').length > 1

            return hasPoint ? _value.toFixed(2) : _value.toString()
        },
    },
}
</script>
