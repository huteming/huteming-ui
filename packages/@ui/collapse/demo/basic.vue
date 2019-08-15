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

    <tm-divider>disabled</tm-divider>

    <tm-collapse v-model="active3" accordion @change="handleChange">
        <tm-collapse-item name="1" header="title1" disabled>
            <tm-cell title="hello"></tm-cell>
        </tm-collapse-item>

        <tm-collapse-item name="2" header="title2" disabled>
            <tm-cell title="hello"></tm-cell>
        </tm-collapse-item>

        <tm-collapse-item name="3" header="title3" disabled>
            <tm-cell title="hello"></tm-cell>
        </tm-collapse-item>

        <tm-collapse-item name="4" header="title4">
            <tm-cell title="hello"></tm-cell>
        </tm-collapse-item>

        <tm-collapse-item name="5" header="title5">
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
            active3: [],
        }
    },

    methods: {
        handleChange (current) {
            console.log('change to: ', current)
        },
    },
}
</script>
