<template>
<div class="accordion">
    <div class="accordion-header" @click="open = !open">
        <div class="accordion-header-name">{{ title }}</div>

        <TmIcon class="accordion-header-arrow" :icon="open ? 'expand_less' : 'expand_more'" />
    </div>

    <transition :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave">
        <div class="accordion-container" v-show="open">
            <router-link class="accordion-list" tag="div" v-for="item in list" :key="item.path" :to="`/example/${item.path}`">
                <div class="accordion-list-title">{{ item.title }}</div>

                <TmIcon class="accordion-list-arrow" icon="arrow_forward" />
            </router-link>
        </div>
    </transition>
</div>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
    props: {
        title: String,
        /**
         * name, path
         */
        list: Array
    },

    data () {
        return {
            open: false,
            height: ''
        }
    },

    computed: {
        styles () {
            return {
                height: `${this.height}px`
            }
        }
    },

    methods: {
        beforeEnter (el) {
            el.style.height = 0
        },
        enter (el, done) {
            Velocity(el, { height: `${this.list.length * 44}px` }, { duration: 20000, easing: 'ease', complete: done })
        },
        afterEnter (el) {
            el.style.height = ''
        },
        beforeLeave (el) {
            el.style.height = `${this.list.length * 44}px`
        },
        leave (el, done) {
            Velocity(el, { height: 0 }, { duration: 20000, easing: 'ease', complete: done })
        },
        afterLeave (el) {
            el.style.height = ''
        }
    },

    components: {
    },
}
</script>

<style lang="scss" scoped>
.accordion {
    padding-left: 24px;
    background: #fff;
    border-radius: 4px;

    &-header {
        display: flex;
        align-items: center;
        height: 70px;
        padding-right: 20px;
        font-size: 16px;
        line-height: 70px;
        color: #404040;

        &-name {
            flex: 1;
        }

        &-arrow {
            font-size: 28px;
            color: #d2d2d6;
        }
    }

    &-container {
        overflow: hidden;
    }

    &-list {
        display: flex;
        align-items: center;
        padding-right: 15px;
        height: 44px;
        line-height: 44px;

        &-title {
            flex: 1;
            color: #666;
            font-size: 14px;
        }

        &-arrow {
            font-size: 28px;
            color: #d2d2d6;
        }

        & + & {
            border-top: 1px solid #ddd;
        }
    }

    & + & {
        margin-top: 15px;
    }
}
</style>
