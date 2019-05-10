<template>
<div class="demo">
    <TmBtnPay
        price="12.00"
        through="原价：13.00"
        text="限时特价"
        btn="支付学费"
        @click="handleClick" />
</div>
</template>

<script>
import TmBtnPay from '../index.js'

export default {
    methods: {
        handleClick () {
            console.log('click')
        },
    },

    components: {
        TmBtnPay,
    },
}
</script>
