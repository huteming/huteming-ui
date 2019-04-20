<template>
<div class="page">
    <button @click="actionsheet('取消')">默认</button>
    <button @click="actionsheet('')">不带取消按钮</button>
    <button @click="title('阿斯蒂芬iwoe；安慰u人撒独立开发；啊饿哦我i；上了地方')">标题</button>
    <button @click="handleClickOnModal()">点击遮层不关闭</button>
</div>
</template>

<script>
export default {
    methods: {
        actionsheet (cancelText) {
            const menus = [
                { label: 'label - 1', value: 'value - 1' },
                { label: 'label - 2', value: 'value - 2' }
            ]
            this.$actionsheet({ menus, cancelText })
                .then(value => {
                    const clicked = menus.find(item => item.value === value)
                    console.log(clicked.label)
                })
                .catch(() => {
                    console.log('取消')
                })
        },
        title (title) {
            const menus = [
                { label: 'label - 3', value: 'value - 3' },
                { label: 'label - 4', value: 'value - 4' }
            ]
            this.$actionsheet({ menus, title })
                .then(value => {
                    const clicked = menus.find(item => item.value === value)
                    console.log(clicked.label)
                })
                .catch(() => {
                    console.log('取消')
                })
        },
        handleClickOnModal () {
            const menus = [
                { label: 'label - 5', value: 'value - 5' },
                { label: 'label - 6', value: 'value - 6' }
            ]
            this.$actionsheet({ menus, closeOnClickModal: false })
                .then(value => {
                    const clicked = menus.find(item => item.value === value)
                    console.log(clicked.label)
                })
                .catch(() => {
                    console.log('取消')
                })
        },
    },
}
</script>
