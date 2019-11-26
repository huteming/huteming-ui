<template>
<div class="page-demo">
    <demo-divider>基础用法</demo-divider>
    <tm-btn-pay
        title="79"
        tip="原价：99元"
        desc="VIP已减20元"
        btn="支付学费" >
    </tm-btn-pay>

    <demo-divider>显示标题</demo-divider>
    <tm-btn-pay
        titlePrefix=""
        title="放大标题"
        btn="支付学费">
    </tm-btn-pay>

    <demo-divider>自定义desc样式</demo-divider>
    <tm-btn-pay
        title="79"
        tip="原价：99元"
        desc="VIP已减20元"
        :desc-style="{ color: 'rgba(217, 166, 47, 1)' }"
        btn="支付学费" >
    </tm-btn-pay>

    <demo-divider>自定义 btn</demo-divider>
    <tm-btn-pay
        title="79"
        tip="原价：99元"
        desc="VIP已减20元"
        :btn-style="{ background: 'linear-gradient(137deg,rgba(245,226,147,1) 0%,rgba(230,186,90,1) 100%)' }"        >
        <img src="./btn-xuefei.png" alt="" style="width: 76px;" slot="btn">
    </tm-btn-pay>

    <demo-divider>自定义tip&desc样式</demo-divider>
    <TmBtnPay
        title="79"
        tip="加入VIP"
        desc="可减20元"
        btn="支付学费" />

    <demo-divider>disabled</demo-divider>
    <TmBtnPay
        title="79"
        desc="可减20元"
        btn="支付学费"
        disabled />

    <demo-divider>最大宽度</demo-divider>
    <tm-btn-pay
        title="7999.99"
        tip="原价：999.99"
        btn="支付学费">
        <img src="./icon-vip.png" alt="" style="width: .9rem; height: .28rem;"  slot="desc">
        <span slot="desc">￥9999.99</span>
    </tm-btn-pay>

    <div class="spacing"></div>

    <tm-btn-pay
        title-prefix=""
        desc="原价：99.99"
        btn="支付学费">
        <span slot="title">这是一标题</span>
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
.spacing {
    height: 20px;
}
</style>
