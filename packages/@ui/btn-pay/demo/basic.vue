<template>
<div class="demo">
    <TmBtnPay
        btn="支付学费"
        :btn-style="{ background: 'linear-gradient(137deg,rgba(245,226,147,1) 0%,rgba(230,186,90,1) 100%)', color: 'rgba(128, 79, 36, 1)' }"
        btn-only
        @click="handleClick" />

    <div class="spacing"></div>

    <tm-btn-pay
        titlePrefix="$"
        :title="79"
        tip="原价：99元"
        tipThrough
        desc="VIP已减20元"
        :desc-style="{ color: 'rgba(217, 166, 47, 1)' }"
        :btn-style="{ background: 'linear-gradient(137deg,rgba(245,226,147,1) 0%,rgba(230,186,90,1) 100%)', color: 'rgba(128, 79, 36, 1)' }" >
        <span slot="btn">支付学费</span>
    </tm-btn-pay>

    <div class="spacing"></div>

    <tm-btn-pay
        title="VIP已过期"
        btn="支付学费"
        :btn-style="{ background: 'linear-gradient(137deg,rgba(245,226,147,1) 0%,rgba(230,186,90,1) 100%)' }"        >
        <img src="./btn-xuefei.png" alt="" style="width: 76px;" slot="btn">
    </tm-btn-pay>

    <div class="spacing"></div>

    <TmBtnPay
        :title="79"
        tip="加入VIP"
        desc="可减20元"
        btn="支付学费" />

    <div class="spacing"></div>

    <TmBtnPay
        :title="79"
        tip="加入VIP"
        tip-through
        btn="支付学费" />

    <div class="spacing"></div>

    <TmBtnPay
        :title="79"
        desc="可减20元"
        btn="支付学费" />

    <div class="spacing"></div>

    <TmBtnPay
        :title="79"
        desc="可减20元"
        btn="支付学费"
        @click="handleClick"
        disabled />

    <tm-divider>价格格式化</tm-divider>

    <TmBtnPay
        :title="79.1"
        tip="原数据：79.1"
        btn="支付学费" />

    <div class="spacing"></div>

    <TmBtnPay
        :title="79.01234"
        tip="原数据：79.01234"
        btn="支付学费" />

    <tm-divider>最大宽度</tm-divider>

    <tm-btn-pay :title="7999.99" tip="原价：999.99" tip-through btn="支付学费" :desc-style="{ color: 'rgba(230, 198, 136, 1)', 'font-size': '.26rem', 'font-weight': 'bold' }">
        <img src="./icon-vip.png" alt="" style="width: .9rem; height: .28rem;"  slot="desc">
        <span  slot="desc">￥9.99</span>
    </tm-btn-pay>

    <div class="spacing"></div>

    <tm-btn-pay :title="7999.99" desc="原价：999.99" desc-through btn="支付学费">
        <img src="./icon-vip.png" alt="" style="width: .9rem; height: .28rem;"  slot="tip">
        <span  slot="tip">￥9.99</span>
    </tm-btn-pay>

    <div class="spacing"></div>

    <tm-btn-pay desc="原价：99.99" btn="支付学费">
        <img src="./icon-vip.png" alt="" style="width: .9rem; height: .28rem;"  slot="title">
        <span  slot="title">这是一标题</span>
    </tm-btn-pay>
</div>
</template>

<script>
export default {
    methods: {
        handleClick () {
            console.log('click')
        },
    },
}
</script>

<style lang="scss" scoped>
.demo {
    min-height: 100vh;
    background-color: #f6f6f6;
}

.spacing {
    height: 20px;
}
</style>
