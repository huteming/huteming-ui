<template>
<div class="demo">
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
    methods: {
    },

    components: {
        TmFlex,
        TmFlexItem,
    },
}
</script>

<style lang="scss" scoped>
.mb-20 {
    margin-bottom: 20px;
}

.container {
    height: 100px;
    margin-bottom: 20px;
    background: #fff;
}

.placeholder {
    background-color: #ebebef;
    color: #bbb;
    text-align: center;
    height: 30px;
    line-height: 30px;
    width: 100%;

    &.inline {
        width: 100px;
    }

    &.small {
        font-size: 12px;
        height: 15px;
        line-height: 15px;
    }

    &.large {
        height: 50px;
        line-height: 50px;
    }
}
</style>
