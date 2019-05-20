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
            success () {
                console.log('hello world')
            },
            channel: true,
            query: [
                {
                    key: 'hello',
                    value: 'world',
                },
                {
                    key: 'mainUnion',
                    value: 'test_force',
                    force: true,
                },
                {
                    key: 'subUnion',
                    value: 'no_force',
                    force: false,
                },
            ],
        })
    },
}
</script>
