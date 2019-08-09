<template>
<transition
    name="fade"
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
