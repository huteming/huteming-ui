<template>
<div class="page-example">
    <button @click="visibleDialog = true">open</button>

    <tm-dialog v-model="visibleDialog" @close="handleClose" @closed="handleClosed">
        <img src="./jinghaokefu.png" alt="" class="image" />
    </tm-dialog>
</div>
</template>

<script>
import TmDialog from '../index'

export default {
    data () {
        return {
            visibleDialog: false
        }
    },

    methods: {
        handleOpen () {
            console.log('open')
        },
        handleClose () {
            console.log('close')
        },
        handleClosed () {
            console.log('closed')
        },
        handleBeforeClose (done) {
            console.log('close 2s later')
            setTimeout(done, 2000)
        }
    },

    components: {
        TmDialog,
    }
}
</script>

<style lang="scss" scoped>
.image {
    display: block;
    width: 100%;
    border: none;
}
</style>
