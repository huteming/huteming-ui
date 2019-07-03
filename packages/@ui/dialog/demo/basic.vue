<template>
<div class="page-example">
    <button @click="visibleDialog = true">open</button>
    <button @click="beforeClose = handleBeforeClose; visibleDialog = true">before close</button>

    <tm-dialog v-model="visibleDialog" :before-close="beforeClose" @close="handleClose" @closed="handleClosed">
        <img src="./jinghaokefu.png" alt="" class="image" />
    </tm-dialog>
</div>
</template>

<script>
import TmDialog from '../index'
import Toast from 'web-ui/toast'

export default {
    data () {
        return {
            visibleDialog: false,
            beforeClose: null,
        }
    },

    mounted () {
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
            Toast('close 2s later')
            setTimeout(done, 2000)
        },
    },

    components: {
        TmDialog,
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    height: 100px;
    overflow: auto;
}

.image {
    display: block;
    width: 100%;
    height: 200px;
    border: none;
}
</style>
