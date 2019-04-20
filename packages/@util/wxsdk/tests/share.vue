<template>
<div class="share">
    <h1>This is an share page</h1>
</div>
</template>

<script>
import wxsdk from '../index'
const { wxShare } = wxsdk

export default {
    mounted () {
        wxShare({
            title: 'hello',
            desc: 'world',
        })
    },
}
</script>
