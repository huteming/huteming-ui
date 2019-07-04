<template>
<transition
    name="modal-fade"
    @before-enter="handleBeforeEnter"
    @after-enter="handleAfterEnter"
    @before-leave="handleBeforeLeave"
    @after-leave="handleAfterLeave">
    <div class="tm-modal" :style="styles" v-show="visible" @click.stop="handleClick" @touchmove.prevent.stop></div>
</transition>
</template>

<script>
export default {
    name: 'TmModal',

    data () {
        return {
            zIndex: 9999,

            visible: false,

            callbackClick: null,
            callbackBeforeEnter: null,
            callbackAfterEnter: null,
            callbackBeforeLeave: null,
            callbackAfterLeave: null,
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
        handleClick () {
            if (typeof this.callbackClick === 'function') {
                this.callbackClick()
            }
        },
        /**
         * 动画钩子
         */
        handleBeforeEnter () {
            if (typeof this.callbackBeforeEnter === 'function') {
                this.callbackBeforeEnter()
            }
        },
        handleAfterEnter () {
            if (typeof this.callbackAfterEnter === 'function') {
                this.callbackAfterEnter()
            }
        },
        handleBeforeLeave () {
            if (typeof this.callbackBeforeLeave === 'function') {
                this.callbackBeforeLeave()
            }
        },
        handleAfterLeave () {
            this.handleElementDestroy()

            if (typeof this.callbackAfterLeave === 'function') {
                this.callbackAfterLeave()
            }
        },
        /**
         * helper ------------------
         */
        show (options = {}) {
            this.setData(options)
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
        handleElementDestroy () {
            this.$destroy(true)
            this.$el.parentNode.removeChild(this.$el)
        },
    }
}
</script>

<style lang="scss" scoped>
.tm-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

</style>
