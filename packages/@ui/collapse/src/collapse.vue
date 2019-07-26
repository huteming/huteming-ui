<template>
<div class="tm-collapses">
    <slot></slot>
</div>
</template>

<script>
export default {
    name: 'TmCollapse',

    props: {
        value: {
            type: [String, Number, Array],
        },
        accordion: Boolean,
    },

    data () {
        return {
            activeNames: [].concat(this.value),
        }
    },

    watch: {
        value (val) {
            this.activeNames = [].concat(val)
        },
    },

    methods: {
        setActiveNames (_activeNames) {
            this.activeNames = _activeNames.concat()
            const value = this.accordion ? this.activeNames[0] : this.activeNames
            this.$emit('input', value)
            this.$emit('change', value)
        },
        change (name) {
            const _activeNames = this.activeNames.concat()

            if (this.accordion) {
                // 如果在手风琴模式点击展开项，关闭它
                const _name = (_activeNames[0] || _activeNames[0] === 0) && _activeNames[0] === name ? '' : name
                _activeNames[0] = _name
            } else {
                const index = _activeNames.indexOf(name)
                if (index > -1) { // 关闭
                    _activeNames.splice(index, 1)
                } else { // 打开
                    _activeNames.push(name)
                }
            }
            this.setActiveNames(_activeNames)
        },
    },
}
</script>

<style lang="scss" scoped>
.tm-collapses {
    width: 100%;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    box-sizing: border-box;
}
</style>
