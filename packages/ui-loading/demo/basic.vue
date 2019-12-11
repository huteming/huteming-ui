<template>
<div class="page-demo">
    <demo-cell body="loading">
        <tm-switch v-model="loading"></tm-switch>
    </demo-cell>
    <demo-cell body="use background">
        <tm-switch v-model="background"></tm-switch>
    </demo-cell>
    <demo-cell body="use text">
        <tm-field v-model="text" placeholder="请输入"></tm-field>
    </demo-cell>

    <demo-divider>分隔线</demo-divider>

    <div v-loading="{ loading, text, background: backgroundStr, duration, openAnimation: true, closeAnimation: true }" style="position: relative;">
        <h1 v-for="item in count" :key="item">hello world</h1>
    </div>
</div>
</template>

<script>
import Loading from '../src/main'

export default {
    data () {
        return {
            loading: true,
            text: '',
            background: false,
            duration: 1000,
            count: 1,
        }
    },

    computed: {
        backgroundStr () {
            return this.background ? '#000' : ''
        }
    },

    mounted () {
        // setTimeout(() => {
        //     this.count = 10
        // }, 10000)
        // this.loading = false

        // setTimeout(() => {
        //     this.loading = false
        // }, 2000)

        // setTimeout(() => {
        //     this.loading = false
        // }, 4000)
    },

    directives: {
        Loading,
    },
}
</script>
