<template>
<div class="location">
    <h1>This is an location page</h1>
    {{ address }}
</div>
</template>

<script>
import wxsdk from '../index'
const { wxLocation } = wxsdk

export default {
    data () {
        return {
            address: '',
        }
    },

    async mounted () {
        const data = await wxLocation()
        this.address = data.formatted_address
    },
}
</script>
