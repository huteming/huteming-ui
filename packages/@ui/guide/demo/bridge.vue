<template>
<div class="demo">
    <div class="aaa hello" ref="hello"></div>

    <!-- other -->
    <!-- <div class="subtitle">subtitle</div> -->
</div>
</template>

<script>
/**
 * 跨页面的引导，这里暂时还是写成在多个页面分别创建实例，而不是共用一个实例
 * 可以通过 页面查询参数 + before钩子中（路由跳转 + 关闭当前实例）来完成整条引导
 * complete函数只会在完成某个实例中的所有选项时才会执行，所以上述的 before 中关闭引导，并不会触发 complete 函数
 */
import GuideNavs from './Navs/display'
// import GuidePersonal from './Personal/display'
import GuideReadPlan from './ReadPlan/display'
import GuideWallet from './Wallet/display'
import Guide from '../index'

export default {
    mounted () {
        const init = this.$route.query.guide === '1' ? 'readplan' : ''
        const instance = new Guide([
            {
                name: 'navs',
                target: '.hello',
                component: GuideNavs,
            },
            {
                name: 'wallet',
                target: '.hello',
                component: GuideWallet,
            },
            {
                name: 'personal',
                before: (done) => {
                    this.$router.push('/example?guide=1')
                    instance.close()
                },
            },
            {
                name: 'readplan',
                target: '.hello',
                component: GuideReadPlan,
            },
        ], {
            init,
            complete: () => {
                console.log('complete basic')
                this.$router.push('/example/guide')
            },
        })
        instance.open()

        // other
        // if (this.$route.query.guide === '1') {
        //     const instance = new Guide([
        //         {
        //             name: 'personal',
        //             target: '.subtitle',
        //             component: GuidePersonal,
        //         },
        //     ], {
        //         complete: () => {
        //             this.$router.push('/example/guide?guide=1')
        //         },
        //     })
        //     instance.open()
        // }
    }
}
</script>
