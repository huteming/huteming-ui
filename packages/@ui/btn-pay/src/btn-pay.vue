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

<style lang="scss" scoped>
.tm-pay {
    position: relative;
    width: 100%;
    height: rem(120);
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;

    &-container {
        width: rem(492);
        height: rem(100);
        display: flex;
        align-items: center;
        padding: 0 rem(20) 0 rem(48);
        box-shadow: 0 rem(-8) rem(20) rem(-20) rgba(99,150,247,0.6);
        background-color: #fff;
        box-sizing: border-box;
    }

    &-btn {
        flex: 1;
        height: rem(120);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: rem(34);
        line-height: rem(48);
        color: rgba(255, 255, 255, 1);
        font-weight: 500;
        background: linear-gradient(153deg, rgba(78,173,243,1) 0%, rgba(157,230,255,1) 100%);
        border-radius: rem(22) rem(22) 0 0;
        box-sizing: border-box;
    }

    &-prefix {
        font-size: rem(40);
        line-height: rem(56);
        color: rgba(34, 34, 34, 1);
    }

    &-price {
        font-size: rem(56);
        line-height: rem(60);
        color: rgba(34, 34, 34, 1);
        font-weight: bold;
    }

    &-title {
        display: flex;
        align-items: center;
        font-size: rem(36);
        line-height: rem(50);
        color: rgba(34, 34, 34, 1);
        font-weight: bold;
        white-space: nowrap;
    }

    &-tip {
        position: relative;
        display: flex;
        align-items: center;
        font-size: rem(24);
        line-height: rem(34);
        color: rgba(34, 34, 34, 1);
        letter-spacing: .5px;
        white-space: nowrap;

        &.through {
            color: rgba(153, 153, 153, 1);
            text-decoration: line-through;
        }
    }

    &-desc {
        position: relative;
        display: flex;
        align-items: center;
        font-size: rem(24);
        line-height: rem(34);
        color: rgba(34, 34, 34, 1);
        letter-spacing: .5px;
        white-space: nowrap;

        &.through {
            color: rgba(153, 153, 153, 1);
            text-decoration: line-through;
        }
    }

    &-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: rem(20);
    }
}
</style>
