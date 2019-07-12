<template>
<div class="demo">
    <button @click="loading = !loading">toggle loading: {{ loading }}</button>
    <button @click="background = !background">toggle background: {{ background }}</button>
    <input type="text" placeholder="text" v-model="text">

    <div v-loading="{ loading, text, background: backgroundStr, duration, needAnimation: false }" style="position: relative; height: 3rem;">
        <h1>hello world</h1>
        <h1>hello world</h1>
    </div>
</div>
</template>

<script>
import Loading from '../index'

export default {
    data () {
        return {
            loading: true,
            text: '',
            background: false,
            duration: 1000,
        }
    },

    computed: {
        backgroundStr () {
            return this.background ? '#000' : ''
        }
    },

    mounted () {
        this.loading = false

        setTimeout(() => {
            this.loading = true
        }, 2000)

        setTimeout(() => {
            this.loading = false
        }, 4000)
    },

    directives: {
        Loading,
    },
}
</script>
