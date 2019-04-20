<template>
<transition name="slide-bottom-out">
    <div class="tm-actions" :style="styles" v-show="visible">
        <div class="tm-actions-title" v-if="title">{{ title }}</div>

        <div class="tm-actions-menus"
            v-for="item in menus"
            :key="item.value"
            @click="handleClickMenu(item.value)">
            {{ item.label }}
        </div>

        <template v-if="cancelText">
            <div class="tm-actions-spacing"></div>

            <div class="tm-actions-menus" @click="handleClickMenu('')">
                {{ cancelText }}
            </div>
        </template>
    </div>
</transition>
</template>

<script>
import MixinsModal from 'web-ui/modal/index.js'
import zindexManager from 'web/assets/js/zindex-manager'

export default {
    name: 'actionsheet',
    mixins: [MixinsModal],

    props: {
        title: String,
        menus: {
            type: Array,
            default () {
                return []
            }
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        closeOnClickModal: {
            type: Boolean,
            default: true
        }
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
            this.$_closeModal({
                callbackAfterLeave: () => {
                    actionValue ? this.resolve(actionValue) : this.reject()

                    this.destroyElement()
                }
            })

            this.visible = false
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
