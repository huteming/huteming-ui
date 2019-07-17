<template>
<transition
    name="loading-fade"
    @before-enter="log('before-enter')"
    @after-enter="log('after-enter')"
    @before-leave="log('before-leave')"
    @after-leave="log('after-leave')">
    <div v-show="visible"></div>
</transition>
</template>

<script>
export default {
    data () {
        return {
            visible: false,
        }
    },
    methods: {
        log (text) {
            console.log('text', text)
            console.log('text', text)
            console.log('text', text)
        },
    },
}
</script>

<style lang="scss" scoped>
.loading-fade-enter,
.loading-fade-leave-to {
    opacity: 0;
}

.loading-fade-enter-to,
.loading-fade-leave {
    opacity: 1;
}

.loading-fade-enter-active,
.loading-fade-leave-active {
    transition: opacity 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
}
</style>
