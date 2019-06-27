<template>
<transition :name="transition" @after-leave="handleAfterLeave">
    <div class="tm-popup" v-show="visible" :class="classes" :style="styles">
        <slot></slot>
    </div>
</transition>
</template>

<script>
import MixinsModal from 'web-ui/modal/index.js'
import zindexManager from 'web/assets/js/zindex-manager'

export default {
    name: 'TmPopup',
    mixins: [MixinsModal],

    props: {
        // 显示弹框
        value: {
            type: Boolean,
            default: false
        },
        beforeClose: Function,
        // 显示位置
        position: {
            type: String,
            default: 'middle',
            validator (val) {
                return ['middle', 'top', 'bottom', 'left', 'right'].indexOf(val) > -1
            }
        },
        closeOnClickModal: {
            type: Boolean,
            default: true
        },
        /**
         * 定时消失
         * postion = top 时，生效
         */
        duration: {
            type: Number,
            default: 3000,
        },
    },

    data () {
        return {
            zIndex: 9999,

            visible: this.value,
            maskInstance: null
        }
    },

    computed: {
        transition () {
            switch (this.position) {
            case 'top':
                return 'popup-slide-top'
            case 'bottom':
                return 'popup-slide-bottom'
            case 'left':
                return 'popup-slide-left'
            case 'right':
                return 'popup-slide-right'
            default:
                return 'popup-fade'
            }
        },
        classes () {
            return {
                [`tm-popup-${this.position}`]: true
            }
        },
        styles () {
            return {
                'z-index': this.zIndex,
            }
        },
    },

    watch: {
        value (val) {
            // this.visible = val
            val ? (this.show()) : (this.hide())
        },
        visible (val) {
            this.$emit('input', val)
        },
    },

    mounted () {
        if (this.value) {
            this.show()
        }
    },

    methods: {
        handleAfterLeave () {
            this.$emit('closed')
        },
        handleClickModal () {
            if (this.closeOnClickModal) {
                this.visible = false
            }
        },
        show () {
            if (['middle', 'bottom', 'left'].indexOf(this.position) > -1) {
                this.$_openModal({
                    callbackClick: this.handleClickModal,
                }, this.$el)
            }

            if (this.position === 'top') {
                setTimeout(() => {
                    this.visible = false
                }, this.duration)
            }

            // 必须在调用 openModal 之后
            // 为了获取动态 zindex
            this.zIndex = zindexManager.zIndex

            this.visible = true

            this.$emit('open')
        },
        hide () {
            const done = () => {
                this.$_closeModal()
                this.visible = false

                this.$emit('close')
            }

            if (typeof this.beforeClose === 'function') {
                this.beforeClose(done)
            } else {
                done()
            }
        },
    },
}
</script>

<style lang="scss" scoped>
@import './style/index.scss';
</style>
