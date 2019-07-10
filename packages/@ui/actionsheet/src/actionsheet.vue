<template>
<transition name="slide-bottom-out" @after-leave="handleAfterLeave">
    <div class="tm-actions" :style="styles" v-show="visible">
        <div class="tm-actions-title" v-if="title">{{ title }}</div>

        <div class="tm-actions-menus"
            v-for="item in menus"
            :key="item.value"
            @click="handleClickMenu(item.value)">
            <span>{{ item.label }}</span>
        </div>

        <template v-if="cancelText">
            <div class="tm-actions-spacing"></div>

            <div class="tm-actions-menus" id="tm-actions-cancel" @click="handleClickMenu('')">
                <span>{{ cancelText }}</span>
            </div>
        </template>
    </div>
</transition>
</template>

<script>
import MixinsModal from 'web-ui/modal/index.js'
import zindexManager from 'web/assets/js/zindex-manager'

export default {
    name: 'TmActionsheet',
    mixins: [MixinsModal],

    props: {
        title: String,
        menus: {
            type: Array,
            required: true,
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        closeOnClickModal: {
            type: Boolean,
            default: true
        },
    },

    data () {
        return {
            visible: false,
            resolve: null,
            reject: null,
            zIndex: 9999,
        }
    },

    computed: {
        styles () {
            return {
                'z-index': this.zIndex,
            }
        },
    },

    methods: {
        handleClickMenu (actionValue) {
            this.close(actionValue)
        },
        handleClickModal () {
            if (this.closeOnClickModal) {
                this.close()
            }
        },
        handleAfterLeave () {
            this.destroyElement()
        },
        open () {
            this.$_openModal({
                callbackClick: this.handleClickModal,
            }, this.$el)

            // 必须在调用 openModal 之后
            // 为了获取动态 zindex
            this.zIndex = zindexManager.zIndex
            this.visible = true
        },
        close (actionValue) {
            this.$_closeModal()
            this.visible = false

            actionValue ? this.resolve(actionValue) : this.reject()
        },
        /**
         * 销毁dom
         */
        destroyElement () {
            this.$destroy()
            this.$el.parentNode.removeChild(this.$el)
        },
    }
}
</script>

<style lang="scss" scoped>
@import './style/index.scss';
</style>
