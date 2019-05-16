<template>
<div class="tm-flexbox-item" :style="styles" :class="classes">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'TmFlexItem',

    props: {
        order: {
            type: Number,
            default: 0
        },
        grow: {
            type: Number,
            default: 0
        },
        shrink: {
            type: Number,
            default: 1
        },
        basis: {
            type: String,
            default: 'auto'
        },
        align: {
            type: String,
            default: 'auto',
            validator (val) {
                return ['auto', 'start', 'center', 'end', 'baseline', 'stretch'].indexOf(val) > -1
            }
        },
        gutter: {
            type: String,
            default: '0',
        },
    },

    computed: {
        styles () {
            return {
                order: this.order,
                'flex-grow': this.grow,
                'flex-shrink': this.shrink,
                'flex-basis': this.basis,
                'margin': this.gutter || this.$parent.gutter,
            }
        },
        classes () {
            return {
                [`is-self-${this.align}`]: true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.is-self-auto {
    align-self: auto;
}

.is-self-start {
    align-self: flex-start;
}

.is-self-center {
    align-self: center;
}

.is-self-end {
    align-self: flex-end;
}

.is-self-baseline {
    align-self: baseline;
}

.is-self-stretch {
    align-self: stretch;
}
</style>
