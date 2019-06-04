<template>
<div class="tm-pay">
    <template v-if="!btnOnly">
        <template v-if="price">
            <div class="tm-pay-prefix">{{ pricePrefix }}</div>
            <div class="tm-pay-price">{{ price | tofixed(2, true) }}</div>
        </template>
        <template v-else>
            <div class="tm-pay-title">{{ title }}</div>
        </template>

        <div class="tm-pay-group">
            <div class="tm-pay-text" v-if="tip">{{ tip }}</div>
            <div class="tm-pay-through" v-else>{{ through }}</div>

            <div class="tm-pay-text" :style="descStyle">{{ desc }}</div>
        </div>
    </template>

    <div class="tm-pay-btn" :style="btnStyle" @click="handleClick">
        <slot name="btn">{{ btn }}</slot>
    </div>
</div>
</template>

<script>
import { tofixed } from 'web-util/tool/src/main.js'

export default {
    name: 'TmBtnPay',

    props: {
        pricePrefix: {
            type: String,
            default: '￥',
        },
        price: Number,
        title: String,
        through: String,
        tip: String,
        desc: String,
        descStyle: {
            type: Object,
            default () {
                return {}
            },
        },
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
    },

    methods: {
        handleClick () {
            this.$emit('click')
        },
    },

    filters: {
        tofixed,
    },
}
</script>

<style lang="scss" scoped>
.tm-pay {
    position: relative;
    width: 100%;
    height: 1.2rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 -.08rem .2rem -.2rem rgba(99,150,247,0.6);
    box-sizing: border-box;

    &-container {
        padding: .18rem .4rem .16rem .48rem;
        box-shadow: 0 -.08rem .2rem -.2rem rgba(99,150,247,0.6);
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

    &-through {
        position: relative;
        font-size: .26rem;
        line-height: .36rem;
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

    &-text {
        font-size: .26rem;
        line-height: .4rem;
        color: rgba(34, 34, 34, 1);
        letter-spacing: 1px;
    }

    &-btn {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 2.58rem;
        height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: .34rem;
        line-height: .48rem;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(153deg, rgba(78,173,243,1) 0%, rgba(157,230,255,1) 100%);
        border-radius: .22rem .22rem 0 0;
        box-sizing: border-box;
    }

    &-group {
        display: flex;
        flex-direction: column;
        margin-left: .25rem;
    }
}
</style>
