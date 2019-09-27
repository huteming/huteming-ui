<template>
<div>hello PropSync</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import PropSync from 'web/assets/js/PropSync'

@Component
export default class TmPropSync extends Vue {
    @Watch('in')
    onInChange (val: any) {
        this.$emit('changeIn')
    }

    @PropSync('out')
    in: any

    @Watch('out')
    onOutChange (val: any) {
        this.$emit('changeOut')
    }
}
</script>
