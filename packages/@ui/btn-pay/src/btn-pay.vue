<template>
<div class="tm-pay">
    <div class="tm-pay-container" v-if="!btnOnly">
        <div class="tm-pay-prefix">{{ titlePrefix }}</div>

        <div :class="[typeof title === 'number' ? 'tm-pay-price' : 'tm-pay-title']" :style="titleStyle">{{ title | fixed(2, true) }}</div>

        <div class="tm-pay-group">
            <div class="tm-pay-desc" :class="{ 'through': tipThrough }" :style="tipStyle">{{ tip }}</div>
            <div class="tm-pay-desc" :style="descStyle">{{ desc }}</div>
        </div>
    </div>

    <div class="tm-pay-btn" :style="normalizedBtnStyle" @click="handleClick">
        <slot name="btn">{{ btn }}</slot>
    </div>
</div>
</template>

<script>
import { tofixed } from 'web-util/tool/src/main.js'

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
        btn: String,
        btnStyle: {
            type: Object,
            default () {
                return {}
            },
        },
        btnOnly: Boolean,
    },

    computed: {
        normalizedBtnStyle () {
            const _style = {}

            // 只显示按钮时，默认没有圆角
            if (this.btnOnly) {
                _style['border-radius'] = 0
            }

            return Object.assign(_style, this.btnStyle)
        },
    },

    methods: {
        handleClick () {
            this.$emit('click')
        },
    },

    filters: {
        fixed (val, digits, toNumber) {
            if (typeof val === 'string') {
                return val
            }
            return tofixed(val, digits, toNumber)
        },
    },
}
</script>

<style lang="scss" scoped>
.tm-pay {
    position: relative;
    width: 100%;
    height: 1.2rem;
    display: flex;
    align-items: flex-end;
    background-color: #fff;
    box-sizing: border-box;

    &-container {
        width: calc(100% - 2.58rem);
        height: 1rem;
        display: flex;
        align-items: center;
        padding: 0 .4rem 0 .48rem;
        box-shadow: 0 -.08rem .2rem -.2rem rgba(99,150,247,0.6);
        box-sizing: border-box;
    }

    &-btn {
        flex: 1;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .34rem;
        line-height: .48rem;
        color: rgba(255, 255, 255, 1);
        font-weight: 500;
        background: linear-gradient(153deg, rgba(78,173,243,1) 0%, rgba(157,230,255,1) 100%);
        border-radius: .22rem .22rem 0 0;
        box-sizing: border-box;
    }

    &-prefix {
        font-size: .4rem;
        line-height: .56rem;
        color: rgba(34, 34, 34, 1);
    }

    &-price {
        font-size: .56rem;
        line-height: .56rem;
        color: rgba(34, 34, 34, 1);
        font-weight: bold;
    }

    &-title {
        font-size: .36rem;
        line-height: .5rem;
        color: rgba(34, 34, 34, 1);
        font-weight: bold;
    }

    &-desc {
        position: relative;
        font-size: .26rem;
        line-height: .4rem;
        color: rgba(34, 34, 34, 1);
        letter-spacing: .5px;

        &.through {
            color: rgba(153, 153, 153, 1);

            &:after {
                content: ' ';
                position: absolute;
                left: 0;
                right: 0;
                top: 50%;
                height: 1px;
                background-color: rgba(153, 153, 153, 1);
            }
        }
    }

    &-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: .25rem;
    }
}
</style>
