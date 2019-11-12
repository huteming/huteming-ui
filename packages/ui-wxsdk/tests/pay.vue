<template>
<div class="hide">
    <h1>This is an pay page</h1>
</div>
</template>

<script>
import wxsdk from '../index'
const { wxpay } = wxsdk

export default {
    mounted () {
        wxpay({
            type: 10,
            productID: 2735,
            platform: 1,
            mainUnion: '',
            subUnion: '',
        })
    },
}
</script>
