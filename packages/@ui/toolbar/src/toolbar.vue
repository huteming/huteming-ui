<template>
<div class="tm-toolbar">
    <div class="tm-toolbar-action tm-toolbar-action-cancel" @click.stop="handleCancel">{{ cancelText }}</div>
    <div class="tm-toolbar-action tm-toolbar-action-confirm" @click.stop="handleConfirm">{{ confirmText }}</div>
</div>
</template>

<script>
export default {
    name: 'TmToolbar',

    props: {
        // 确定按钮文本
        confirmText: {
            type: String,
            default: '确定'
        },
        // 取消按钮文本
        cancelText: {
            type: String,
            default: '取消'
        },
    },

    methods: {
        handleConfirm () {
            this.$emit('confirm')
        },
        handleCancel () {
            this.$emit('cancel')
        },
    },
}
</script>

<style lang="scss" scoped>
.tm-toolbar {
    display: flex;
    border-bottom: 1px solid #eaeaea;

    &-action {
        flex: 1;
        padding: 14px 0 10px;
        text-align: center;
        font-size: 16px;
        line-height: 1;

        &-confirm {
            color: #4597FF;
        }

        &-cancel {
            color: #999;
        }
    }
}
</style>
