<template>
<div id="app">
    <h1>Welcome to Your Vue.js App</h1>

    <div>json: <span id="json-a">{{ jsonA }}</span></div>
    <div>query: <span id="query-a">{{ queryA }}</span></div>
</div>
</template>

<script>
import tool from '../index'
import imgLogo from '@/assets/images/logo.png'
const { loadImages, jsonToForm, parseQuery } = tool

export default {
    data () {
        return {
            jsonA: '',
            queryA: '',
        }
    },

    async mounted () {
        this.initImage()
        this.initJson()
        this.initQuery()
    },

    methods: {
        async initImage () {
            const domLogo1 = await loadImages(imgLogo)
            const [domLogo2] = await loadImages([imgLogo])

            this.$el.appendChild(domLogo1)
            this.$el.appendChild(domLogo2)
        },
        initJson () {
            const json = {
                a: 'a',
                b: 'c',
            }

            const form = jsonToForm(json)

            this.jsonA = form.get('a')
        },
        initQuery () {
            this.queryA = parseQuery('a')
        },
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
