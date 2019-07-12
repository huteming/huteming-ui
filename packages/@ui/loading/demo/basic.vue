<template>
<div class="demo">
    <button @click="loading = !loading">toggle loading: {{ loading }}</button>
    <button @click="background = !background">toggle background: {{ background }}</button>
    <input type="text" placeholder="text" v-model="text">

    <div v-loading="{ loading, text, background: backgroundStr }" style="position: relative; height: 3rem;">
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
        }
    },

    computed: {
        backgroundStr () {
            return this.background ? '#000' : ''
        }
    },

    directives: {
        Loading,
    },
}
</script>
