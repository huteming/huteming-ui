<template>
<transition
    name="loading-fade"
    @after-enter="handleAfterEnter"
    @after-leave="handleAfterLeave">
    <div class="tm-loading" :class="{ 'tm-loading-transition': needAnimation }" :style="styles" v-show="visible" @click.stop @touchmove.prevent.stop>
        <div class="tm-loading-icon"></div>
        <div class="tm-loading-text" :style="textStyle" v-if="text">{{ text }}</div>
    </div>
</transition>
</template>

<script>
import zindexManager from 'web/assets/js/zindex-manager'

export default {
    name: 'TmLoading',

    props: {
        text: String,
        textStyle: Object,
        background: String,
        needAnimation: {
            type: Boolean,
            default: true,
        },
    },

    data () {
        return {
            zIndex: 9999,
            visible: false,

            callbackAfterEnter: null,
        }
    },

    computed: {
        styles () {
            return {
                'z-index': this.zIndex,
                'background': this.background,
            }
        },
    },

    methods: {
        handleAfterEnter () {
            if (typeof this.callbackAfterEnter === 'function') {
                this.callbackAfterEnter()
            }
        },
        handleAfterLeave () {
            this.destroyElement()
        },
        show (options = {}) {
            this.setData(options)
            this.zIndex = zindexManager.zIndex
            this.visible = true
        },
        hide (options = {}) {
            this.setData(options)
            this.visible = false
        },
        setData (data) {
            for (let key in this.$data) {
                if (data.hasOwnProperty(key)) {
                    this[key] = data[key]
                }
            }
        },
        destroyElement () {
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
        },
    },
}
</script>

<style lang="scss" scoped>
@import 'web/assets/style/icon.scss';

.tm-loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 1);

    &-icon {
        @extend .tm-icon-loading;
    }

    &-text {
        margin-top: 3px;
    }

    &-transition {
        transition: opacity .3s cubic-bezier(0.4, 0.0, 0.2, 1);
    }
}

.loading-fade-enter,
.loading-fade-leave-to {
    opacity: 0;
}
</style>
