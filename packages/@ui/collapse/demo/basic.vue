<template>
<div class="demo">
    <tm-divider>基础用法</tm-divider>

    <tm-collapse v-model="active" @change="handleChange">
        <tm-collapse-item header="title1">
            <tm-cell title="hello"></tm-cell>
        </tm-collapse-item>

        <tm-collapse-item header="title2">
            <tm-cell title="hello"></tm-cell>
        </tm-collapse-item>

        <tm-collapse-item header="title3">
            <tm-cell title="hello"></tm-cell>
        </tm-collapse-item>

        <tm-collapse-item name="4" header="disabled" disabled>
            <tm-flex slot="header" align="center">
                <tm-flex-item><TmIcon icon="play" /></tm-flex-item>
                <tm-flex-item>自定义标题</tm-flex-item>
            </tm-flex>

            <tm-cell title="disabled"></tm-cell>
        </tm-collapse-item>
    </tm-collapse>

    <tm-divider>手风琴</tm-divider>

    <tm-collapse v-model="active2" accordion @change="handleChange">
        <tm-collapse-item name="1" header="title1">
            <tm-cell title="hello"></tm-cell>
        </tm-collapse-item>

        <tm-collapse-item name="2" header="title2">
            <tm-cell title="hello"></tm-cell>
        </tm-collapse-item>

        <tm-collapse-item name="3" header="title3">
            <tm-cell title="hello"></tm-cell>
        </tm-collapse-item>
    </tm-collapse>
</div>
</template>

<script>
export default {
    data () {
        return {
            active: ['4'],
            active2: '',
        }
    },

    methods: {
        handleChange (current) {
            console.log('change to: ', current)
        },
    },
}
</script>
