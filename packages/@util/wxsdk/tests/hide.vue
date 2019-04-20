<template>
<div class="hide">
    <h1>This is an hide page</h1>
</div>
</template>

<script>
import wxsdk from '../index'
const { wxHide } = wxsdk

export default {
    mounted () {
        wxHide()
    },
}
</script>
