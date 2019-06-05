<template>
<transition name="tm-dialog">
    <div class="tm-dialog" v-show="normalizedVisible" :style="styles" @click.stop>
        <div class="tm-dialog-content">
            <slot></slot>
        </div>

        <div class="tm-dialog-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
        </div>

        <div class="tm-dialog-cancel" :class="`tm-dialog-cancel_${closePosition}`" @click="handleClose" v-if="closePosition">
            <img src="./images/icon-close.png" alt="" style="display: block; width: 100%;" />
        </div>
    </div>
</transition>
</template>

<script>
import MixinsModal from 'web-ui/modal/index.js'
import zindexManager from 'web/assets/js/zindex-manager'

export default {
    name: 'TmDialog',
    mixins: [MixinsModal],

    props: {
        value: Boolean,
        beforeClose: Function,
        /**
         * 可选值 out-right, out-left, in-right, in-left, bottom
         */
        closePosition: {
            type: String,
            default: '',
        },
        closeOnClickModal: {
            type: Boolean,
            default: true,
        }
    },

    data () {
        return {
            zIndex: 9999,
            visible: this.value,
            normalizedVisible: false,
        }
    },

    computed: {
        styles () {
            return {
                'z-index': this.zIndex,
            }
        },
    },

    watch: {
        value (val) {
            this.visible = val
        },
        visible (val) {
            val ? (this.show()) : (this.hide())

            this.$emit('input', val)
        },
    },

    methods: {
        show () {
            this.$_openModal({
                callbackClick: this.handleClickModal,
            }, this.$el)
            this.normalizedVisible = true

            // 必须在调用 openModal 之后
            // 为了获取动态 zindex
            this.zIndex = zindexManager.zIndex

            this.$emit('open')
        },
        hide () {
            const done = () => {
                this.$_closeModal({
                    callbackAfterLeave: this.handleAfterLeave,
                })
                this.normalizedVisible = false

                this.$emit('close')
            }

            if (typeof this.beforeClose === 'function') {
                this.beforeClose(done)
            } else {
                done()
            }
        },
        handleClose () {
            this.visible = false
        },
        /**
         * 点击 modal 回调
         */
        handleClickModal () {
            if (this.closeOnClickModal) {
                this.visible = false
            }
        },
        /**
         * Dialog 关闭动画结束时的回调
         */
        handleAfterLeave () {
            this.$emit('closed')
        },
    },

    mounted () {
        if (this.value) {
            this.show()
        }
    },
}
</script>

<style lang="scss" scoped>
@import './style/index.scss';
</style>
