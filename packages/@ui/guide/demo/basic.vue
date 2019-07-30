<template>
<div class="demo">
    <button @click="handleStart">start</button>
    <div id="target1" class="hello"></div>
    <div id="target2" class="hello"></div>
    <div id="target3" class="hello"></div>
    <div id="target4" class="hello"></div>
</div>
</template>

<script>
import GuideNavs from './Navs/display'
import GuidePersonal from './Personal/display'
import GuideReadPlan from './ReadPlan/display'
import GuideWallet from './Wallet/display'
import Guide from '../index'

export default {
    data () {
        return {
            instance: null,
        }
    },

    mounted () {
        // 跨页面的引导，参考 bridge.vue 写法
        this.instance = new Guide([
            {
                name: '1',
                target: '#target1',
                component: GuideNavs,
                extra: { title: '1' },
            },
            {
                name: '2',
                target: '#target2',
                component: GuideWallet,
                extra: { title: '2' },
            },
            {
                name: '3',
                target: '#target3',
                component: GuidePersonal,
                extra: { title: '3' },
            },
            {
                name: '4',
                target: '#target4',
                component: GuideReadPlan,
                extra: { title: '4' },
            },
        ], {
            complete: () => {
                console.log('complete')
            },
        })
    },

    methods: {
        handleStart () {
            this.instance.open()
        },
    },
}
</script>

<style lang="scss" scoped>
.hello {
    width: 200px;
    height: 100px;
    margin: 40px auto;
    background: pink;
}
</style>
