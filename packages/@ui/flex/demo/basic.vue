<template>
<div class="page-example">
    <h3 class="text-center">basic</h3>

    <tm-flex class="mb-20" gutter="8px">
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex class="mb-20">
        <tm-flex-item :grow="1" gutter="8px">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1" gutter="8px">
            <div class="placeholder">Block</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex class="mb-20" gutter="8px">
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1" gutter="15px">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex>
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
    </tm-flex>

    <h3 class="text-center">wrap</h3>

    <tm-flex wrap="wrap" gutter="15px">
        <tm-flex-item :grow="1">
            <div class="placeholder inline">Block</div>
        </tm-flex-item>

        <tm-flex-item :grow="1">
            <div class="placeholder inline">Block</div>
        </tm-flex-item>

        <tm-flex-item :grow="1">
            <div class="placeholder inline">Block</div>
        </tm-flex-item>

        <tm-flex-item :grow="1">
            <div class="placeholder inline">Block</div>
        </tm-flex-item>

        <tm-flex-item :grow="1">
            <div class="placeholder inline">Block</div>
        </tm-flex-item>

        <tm-flex-item :grow="1">
            <div class="placeholder inline">Block</div>
        </tm-flex-item>

        <tm-flex-item :grow="1">
            <div class="placeholder inline">Block</div>
        </tm-flex-item>
    </tm-flex>

    <h3 class="text-center">align</h3>

    <tm-flex class="mb-20" align="start">
        <tm-flex-item :grow="1">
            <div class="placeholder small">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder large">Block</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex class="mb-20" align="center">
        <tm-flex-item :grow="1">
            <div class="placeholder small">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder large">Block</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex class="mb-20" align="end">
        <tm-flex-item :grow="1">
            <div class="placeholder small">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder large">Block</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex class="mb-20" align="baseline">
        <tm-flex-item :grow="1">
            <div class="placeholder small">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder large">Block</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex class="mb-20" align="stretch">
        <tm-flex-item :grow="1">
            <div class="placeholder small">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder">Block</div>
        </tm-flex-item>
        <tm-flex-item :grow="1">
            <div class="placeholder large">Block</div>
        </tm-flex-item>
    </tm-flex>

    <h3 class="text-center">justify</h3>

    <tm-flex class="mb-20" justify="start" gutter="8px">
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

    <tm-flex class="mb-20" justify="center" gutter="8px">
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

    <tm-flex class="mb-20" justify="end" gutter="8px">
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

    <tm-flex class="mb-20" justify="between" gutter="8px">
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

    <tm-flex class="mb-20" justify="around" gutter="8px">
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

    <h3 class="text-center">align content</h3>

    <tm-flex class="container" wrap align-content="start" gutter="8px">
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
        <tm-flex-item>
            <div class="placeholder inline">Block</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex class="container" wrap align-content="center" gutter="8px">
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
        <tm-flex-item>
            <div class="placeholder inline">Block</div>
        </tm-flex-item>
    </tm-flex>

    <tm-flex class="container" wrap align-content="end" gutter="8px">
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
        <tm-flex-item>
            <div class="placeholder inline">Block</div>
        </tm-flex-item>
    </tm-flex>
</div>
</template>

<script>
import TmFlex from 'web-ui/flex/index.js'
import TmFlexItem from 'web-ui/flex-item/index.js'

export default {
    methods: {
    },

    components: {
        TmFlex,
        TmFlexItem,
    }
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
