<template>
<div id="app">
    <div id="nav">
        <router-link to="/test/wxsdk/share">Share</router-link> |
        <router-link to="/test/wxsdk/hide">Hide</router-link> |
        <router-link to="/test/wxsdk/location">Location</router-link>
    </div>

    <img alt="Vue logo" src="@/assets/images/logo.png">
    <h1>Welcome to Your Vue.js App</h1>
</div>
</template>

<script>
import wxsdk from '../index'
const { wxConfig, wxSave } = wxsdk

export default {
    data () {
        return {
        }
    },

    watch: {
        '$route' () {
            wxConfig(['location'], 'test_tommy')
        },
    },

    async mounted () {
        wxSave()
        wxConfig(['location'], 'test_tommy')
    },

    methods: {
    },
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.img-block {
    display: block;
    width: 100%;
}
</style>
