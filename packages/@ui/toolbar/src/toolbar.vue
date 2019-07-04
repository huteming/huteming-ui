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

<style lang="scss" scoped>
.tm-toolbar {
    display: flex;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid rgba(246, 246, 247, 1);

    &-title {
        flex-shrink: 0;
        font-size: rem(36);
        line-height: rem(50);
        color: rgba(32, 38, 49, 1);
    }

    &-action {
        flex: 1;
        padding-top: rem(36);
        padding-bottom: rem(36);
        font-size: rem(30);
        line-height: rem(42);

        &-confirm {
            padding-right: rem(40);
            color: rgba(58, 149, 250, 1);
            text-align: right;
        }

        &-cancel {
            padding-left: rem(40);
            color: rgba(142, 146, 150, 1);
        }
    }
}
</style>
