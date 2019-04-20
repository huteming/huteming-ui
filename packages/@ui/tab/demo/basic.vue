<template>
<div class="page-example">
    <h3 class="text-center">完整示例</h3>

    <tm-tab v-model="active" :grow="1" @change="handleChange" class="tab">
        <!-- container -->
        <tm-tab-container name="home">
            <div class="item pink">主页</div>
        </tm-tab-container>

        <tm-tab-container name="more">
            <div class="item white">更多</div>
        </tm-tab-container>

        <tm-tab-container name="me">
            <div  class="item blue">我</div>
        </tm-tab-container>

        <!-- pane -->
        <tm-tab-pane class="tab-container" name="me">
            <div class="tab-title">我</div>
        </tm-tab-pane>

        <tm-tab-pane class="tab-container" name="more">
            <div class="tab-title">更多</div>
        </tm-tab-pane>

        <tm-tab-pane class="tab-container" name="home">
            <div class="tab-title">主页</div>
        </tm-tab-pane>
    </tm-tab>

    <tm-tab v-model="active" @change="handleChange" justify="around">
        <!-- container -->
        <tm-tab-container name="home">
            <div class="item pink">主页</div>
        </tm-tab-container>

        <tm-tab-container name="more">
            <div class="item white">更多</div>
        </tm-tab-container>

        <tm-tab-container name="me">
            <div  class="item blue">我</div>
        </tm-tab-container>

        <!-- pane -->
        <tm-tab-pane name="me">
            <div class="tab-title2">我</div>
        </tm-tab-pane>

        <tm-tab-pane name="more">
            <div class="tab-title2">更多</div>
        </tm-tab-pane>

        <tm-tab-pane name="home">
            <div class="tab-title2">主页</div>
        </tm-tab-pane>
    </tm-tab>

    <h3 class="text-center">快捷方式</h3>

    <tm-tab v-model="active2">
        <tm-tab-container class="item pink" title="主页" name="home">
            home
        </tm-tab-container>

        <tm-tab-container class="item white" title="更多" name="more">
            more
        </tm-tab-container>

        <tm-tab-container class="item blue" title="我" name="me">
            me
        </tm-tab-container>

        <tm-tab-container class="item pink" title="其他" name="other">
            other
        </tm-tab-container>
    </tm-tab>
</div>
</template>

<script>
import TmTab from 'web-ui/tab/index.js'
import TmTabContainer from 'web-ui/tab-container/index.js'
import TmTabPane from 'web-ui/tab-pane/index.js'

export default {
    data () {
        return {
            active: 'me',
            active2: 'other',
        }
    },

    watch: {
        active (val) {
            console.log('watch', val)
        }
    },

    methods: {
        handleChange (name) {
            console.log('change', name)
        }
    },

    components: {
        TmTab,
        TmTabPane,
        TmTabContainer,
    },
}
</script>

<style lang="scss" scoped>
.tab {
    margin-bottom: 30px;

    &-container {
        // flex: 1;
    }

    &-title {
        position: relative;
        padding: .15rem 0 .13rem 0;
        font-size: .3rem;
        line-height: .6rem;
        text-align: center;
    }

    &-title2 {
        width: 80px;
        background: lightblue;
        margin: 10px;
        text-align: center;
        border-radius: 5px;
        padding: 5px 20px;
        box-sizing: border-box;
    }
}

.tm-tab-active .tab-title {
    // color: rgba(255, 255, 255, 1);
    color: pink;

    &:after {
        content: ' ';
        position: absolute;
        bottom: 0;
        left: 50%;
        width: .36rem;
        height: .04rem;
        transform: translate(-50%, 0);
        background-color: blue;
    }
}

.tm-tab-active .tab-title2 {
    background: lightgray;
}

.item {
    height: 100px;
    line-height: 100px;
    text-align: center;
}

.pink {
    background-color: pink;
}

.white {
    background-color: white;
}

.blue {
    background-color: lightblue;
}
</style>
