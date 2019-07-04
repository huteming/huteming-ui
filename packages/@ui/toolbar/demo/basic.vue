<template>
<div class="demo">
    <tm-divider>带有标题</tm-divider>
    <TmToolbar title="标题栏" @confirm="handleConfirm" @cancel="handleCancel" />

    <tm-divider>无标题</tm-divider>
    <TmToolbar />

    <tm-divider>带有标题</tm-divider>
    <TmToolbar title="标题栏" :show-confirm="false" />
</div>
</template>

<script>
import Toast from 'web-ui/toast/index'
import TmToolbar from '../index'

export default {
    methods: {
        handleConfirm () {
            Toast('点击确定')
        },
        handleCancel () {
            Toast('点击取消')
        },
    },

    components: {
        TmToolbar,
    },
}
</script>

<style lang="scss" scoped>
.demo {
    min-height: 100vh;
    background: #f9f9f9;
}
</style>
