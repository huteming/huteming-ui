<template>
<div class="tm-toolbar">
    <div class="tm-toolbar-action tm-toolbar-action-cancel" @click.stop="handleCancel">
        <span>{{ cancelText }}</span>
    </div>

    <div class="tm-toolbar-title">{{ title }}</div>

    <div class="tm-toolbar-action tm-toolbar-action-confirm" @click.stop="handleConfirm">
        <span v-if="showConfirm">{{ confirmText }}</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'TmToolbar',
    inheritAttrs: false,

    props: {
        title: String,
        // 确定按钮文本
        confirmText: {
            type: String,
            default: '确定'
        },
        showConfirm: {
            type: Boolean,
            default: true,
        },
        // 取消按钮文本
        cancelText: {
            type: String,
            default: '取消'
        },
    },

    methods: {
        handleConfirm () {
            if (!this.showConfirm) {
                return false
            }
            this.$emit('confirm')
        },
        handleCancel () {
            this.$emit('cancel')
        },
    },
}
</script>
