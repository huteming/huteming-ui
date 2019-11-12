<template>
<div class="demo">
    <tm-divider>ellipsis</tm-divider>
    <tm-flex class="mb-20" :wrap="false" :gutter="gutter">
        <tm-flex-item>
            <div class="placeholder">无间距</div>
        </tm-flex-item>
        <tm-flex-item :ellipsis="2">
            <p>很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长</p>
        </tm-flex-item>
    </tm-flex>

    <tm-divider>basic</tm-divider>
    <tm-flex class="mb-20">
        <tm-flex-item :grow="1">
            <div class="placeholder">无间距</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">无间距</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex class="mb-20" gutter="0 8px">
        <tm-flex-item :grow="1">
            <div class="placeholder">8px间距</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">8px间距</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex gutter="0 8px">
        <tm-flex-item :grow="1">
            <div class="placeholder">8px</div>
        </tm-flex-item>
        <tm-flex-item :grow="1" gutter="0 15px">
            <div class="placeholder">自定义15px间距</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">8px</div>
        </tm-flex-item>
    </tm-flex>

    <tm-divider>换行</tm-divider>

    <tm-flex wrap="wrap" gutter="0 15px">
        <tm-flex-item>
            <div class="placeholder inline">Block</div>
        </tm-flex-item>

        <tm-flex-item>
            <div class="placeholder inline">Block</div>
        </tm-flex-item>

        <tm-flex-item>
            <div class="placeholder inline">Block</div>
        </tm-flex-item>

        <tm-flex-item>
            <div class="placeholder inline">Block</div>
        </tm-flex-item>
    </tm-flex>

    <tm-divider>交叉轴对齐</tm-divider>

    <tm-flex class="mb-20">
        <tm-flex-item :grow="1">
            <div class="placeholder small"></div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder"></div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder large">默认 stetch</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex align="center">
        <tm-flex-item :grow="1">
            <div class="placeholder small"></div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder"></div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder large">center</div>
        </tm-flex-item>
    </tm-flex>

    <tm-divider>主轴对齐</tm-divider>

    <tm-flex class="mb-20" gutter="0 8px">
        <tm-flex-item>
            <div class="placeholder inline">默认 start</div>
        </tm-flex-item>
        <tm-flex-item>
            <div class="placeholder inline"></div>
        </tm-flex-item>
        <tm-flex-item>
            <div class="placeholder inline"></div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex justify="center" gutter="0 8px">
        <tm-flex-item>
            <div class="placeholder inline">center</div>
        </tm-flex-item>
        <tm-flex-item>
            <div class="placeholder inline"></div>
        </tm-flex-item>
        <tm-flex-item>
            <div class="placeholder inline"></div>
        </tm-flex-item>
    </tm-flex>
</div>
</template>

<script>
import TmFlex from '../src/flex'
import TmFlexItem from '../src/flex-item'

export default {
    data () {
        return {
            gutter: '20px'
        }
    },

    mounted () {
        setTimeout(() => {
            this.gutter = '10px'
        }, 1000)
    },

    methods: {
    },

    components: {
        TmFlex,
        TmFlexItem,
    },
}
</script>

<style lang="scss" scoped>
</style>
