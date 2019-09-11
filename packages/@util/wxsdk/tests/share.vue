<template>
<div class="share">
    <h1>This is an share page</h1>
</div>
</template>

<script>
import wxsdk from '../index'
const { wxShare, wxConfig } = wxsdk

export default {
    mounted () {
        wxConfig(true, 'test_tommy')
        wxShare({
            title: 'hello',
            desc: 'world',
            success () {
                console.log('share in share')
            },
        })
        // this.$router.push('/test/wxsdk/location')
    },
}
</script>
