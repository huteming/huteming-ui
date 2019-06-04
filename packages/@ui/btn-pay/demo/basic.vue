<template>
<div class="demo">
    <TmBtnPay
        btn="支付学费"
        :btn-style="{ background: 'linear-gradient(137deg,rgba(245,226,147,1) 0%,rgba(230,186,90,1) 100%)' }"
        btn-only />

    <div class="spacing"></div>

    <TmBtnPay
        :price="79"
        through="原价：99元"
        desc="VIP已减20元"
        :desc-style="{ color: 'rgba(217, 166, 47, 1)' }"
        btn="支付学费" />

    <div class="spacing"></div>

    <tm-btn-pay
        title="VIP已过期"
        btn="支付学费">
        <img src="./btn-xuefei.png" alt="" style="width: 76px;">
    </tm-btn-pay>

    <div class="spacing"></div>

    <TmBtnPay
        btn="购买VIP"
        btn-only />

    <div class="spacing"></div>

    <TmBtnPay
        :price="79"
        tip="加入VIP"
        desc="可减20元"
        btn="支付学费" />
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

<style lang="scss" scoped>
.spacing {
    height: 20px;
}
</style>
