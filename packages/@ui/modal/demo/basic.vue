<template>
<div class="example-modal">
    <button @click="handleClick">open</button>
</div>
</template>

<script>
import Modal from '../index.js'

export default {
    mixins: [Modal],
    
    mounted () {
        this.handleClick()

        setTimeout(() => {
            // this.handleClick()
        }, 2000)
    },

    methods: {
        handleClick () {
            this.$_openModal({
                callbackClick: () => {
                    this.$_closeModal({
                        callbackBeforeEnter () {
                            console.log('callbackBeforeEnter')
                        },
                        callbackAfterEnter () {
                            console.log('callbackAfterEnter')
                        },
                        callbackBeforeLeave () {
                            console.log('callbackBeforeLeave')
                        },
                        callbackAfterLeave () {
                            console.log('callbackAfterLeave')
                        },
                    })
                },
            })
        },
    },
}
</script>
