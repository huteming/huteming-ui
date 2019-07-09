<template>
<div class="demo">
    <template v-for="fit in fits">
        <tm-divider :key="`${fit}-divider`">{{ fit }}</tm-divider>

        <TmImage
            class="demo-img"
            :src="url"
            :fit="fit"
            :key="`${fit}-image`" />
    </template>

    <tm-divider>占位内容</tm-divider>
    <tm-image class="demo-img" :src="asyncUrl" hold>
    </tm-image>

    <tm-divider>加载失败</tm-divider>
    <tm-image src="hello" class="demo-img">
    </tm-image>

    <tm-divider>懒加载</tm-divider>
    <TmImage class="demo-img" v-for="url in urls" :key="url" :src="url" lazy @load="handleLoad" />
</div>
</template>

<script>
import TmImage from '../index'

export default {
    data () {
        return {
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            asyncUrl: '',

            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',

            urls: [
                'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
                'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
                'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
                'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
                'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
                'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
                'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
            ],
        }
    },

    mounted () {
        // setTimeout(() => {
        //     this.asyncUrl = this.url
        // }, 1500)
    },

    methods: {
        handleLoad (event) {
            console.log('load', event)
        },
    },

    components: {
        TmImage,
    },
}
</script>

<style lang="scss" scoped>
.demo {
    // background: #f6f6f6;

    &-img {
        width: 2rem;
        height: 2rem;
        margin: 0 auto;
    }
}
</style>
