<template>
<div class="location">
    <h1>This is an location page</h1>
    {{ address }}
</div>
</template>

<script>
import wxsdk from '../index'
const { wxLocation, wxConfig, wxShare } = wxsdk

export default {
    data () {
        return {
            address: '',
        }
    },

    async mounted () {
        wxConfig('location', 'test_tommy')
        wxShare({
            title: 'hello',
            desc: 'world',
            success () {
                console.log('share in location')
            },
        })
        const data = await wxLocation()
        this.address = data.formatted_address
    },
}
</script>
