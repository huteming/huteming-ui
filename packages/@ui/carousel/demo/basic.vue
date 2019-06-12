<template>
<div class="test-carousel">
    <h3 class="text-center">async items</h3>

    <tm-carousel height="6rem">
        <tm-carousel-item  v-for="item in asyncItems" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">initial</h3>

    <tm-carousel initial="3">
        <tm-carousel-item  v-for="item in items" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">loop false</h3>

    <tm-carousel :loop="false">
        <tm-carousel-item  v-for="item in items" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">autoplay</h3>

    <tm-carousel autoplay>
        <tm-carousel-item  v-for="item in items" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">interval 1500</h3>

    <tm-carousel :interval="1500" autoplay>
        <tm-carousel-item  v-for="item in items" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">disabledTouch</h3>

    <tm-carousel disabled-touch autoplay>
        <tm-carousel-item  v-for="item in items" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>
</div>
</template>

<script>
import TmCarousel from 'web-ui/carousel/index.js'
import TmCarouselItem from 'web-ui/carousel-item/index.js'
import img1 from './images/img1.jpg'
import img2 from './images/img2.jpg'
import img3 from './images/img3.jpg'
import img4 from './images/img4.jpg'

export default {
    data () {
        return {
            loop: true,
            play: true,
            current: 0,
            currentStr: '1',
            img1,
            img2,
            img3,
            img4,

            items: [
                { name: '1', classes: 'swiper-blue' },
                { name: '2', classes: 'swiper-yellow' },
                { name: '3', classes: 'swiper-pink' },
                { name: '4', classes: 'swiper-yellow' },
            ],
            asyncItems: [],
        }
    },

    methods: {
        handleChange (...val) {
            console.log('change', val)
        }
    },

    created () {
    },

    mounted () {
        setTimeout(() => {
            this.asyncItems = [
                { name: '1', classes: 'swiper-blue' },
                { name: '2', classes: 'swiper-yellow' },
                { name: '3', classes: 'swiper-pink' },
                { name: '4', classes: 'swiper-yellow' },
            ]
        }, 1000)
    },

    components: {
        TmCarousel,
        TmCarouselItem,
    }
}
</script>

<style lang="scss" scoped>
.swiper {
    height: 100%;
    width: 7.5rem;
    line-height: 200px;
    text-align: center;

    &-container {
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &-small {
        width: 3rem;
    }

    &-blue {
        background-color: blue;
    }

    &-pink {
        background-color: pink;
    }

    &-yellow {
        background-color: yellow;
    }
}
</style>
