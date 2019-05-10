<template>
<div class="t-pay">
    <template v-if="price">
        <div class="t-pay-prefix">￥</div>
        <div class="t-pay-price">{{ price | tofixed(2, true) }}</div>
    </template>

    <div class="t-pay-group">
        <div class="t-pay-through" v-if="through">{{ through }}</div>
        <div class="t-pay-text" v-else-if="tip">{{ tip }}</div>

        <div class="t-pay-text">{{ text }}</div>
    </div>

    <div class="t-pay-btn" :style="styleBtn" @click="handleClick">{{ btn }}</div>
</div>
</template>

<script>
import { tofixed } from 'web-util/tool/src/main.js'

export default {
    name: 'TmBtnPay',

    props: {
        price: [String, Number],
        through: String,
        tip: String,
        text: String,
        btn: String,
        btnBackground: String,
    },

    computed: {
        styleBtn () {
            return {
                background: this.btnBackground,
            }
        },
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
.t-pay {
    position: relative;
    width: 100%;
    height: 1rem;
    margin-top: .2rem;
    padding: .18rem 3rem .16rem .48rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 -.08rem .2rem -.2rem rgba(99,150,247,0.6);
    box-sizing: border-box;

    &-prefix {
        font-size: .4rem;
        line-height: .56rem;
        color: rgba(34, 34, 34, 1);
    }

    &-price {
        margin-right: .25rem;
        font-size: .56rem;
        line-height: .56rem;
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
        background: linear-gradient(154deg,rgba(84,171,255,1) 0%,rgba(42,115,253,1) 100%);
        border-radius: .22rem .22rem 0 0;
        box-sizing: border-box;
    }

    &-group {
        display: flex;
        flex-direction: column;
    }
}
</style>
