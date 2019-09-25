<template>
<div class="tm-collapses">
    <slot></slot>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class TmCollapse extends Vue {
    @Prop({ type: [String, Number, Array] }) value: any
    @Prop({ type: Boolean }) accordion: any

    activeNames: (string[] | number[]) = [].concat(this.value)

    @Watch('value')
    onValueChange (val: any) {
        this.activeNames = [].concat(val)
    }

    setActiveNames (_activeNames: any) {
        this.activeNames = _activeNames.concat()
        const value = this.accordion ? this.activeNames[0] : this.activeNames
        this.$emit('input', value)
        this.$emit('change', value)
    }

    change (name: any) {
        const _activeNames: any = this.activeNames.slice()

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
    }
}
</script>
