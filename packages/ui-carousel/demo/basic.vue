<template>
<div class="page-demo">
    <button @click="handleDirectionChange">toggle direction: {{ direction }}</button>

    <h3 class="text-center">基础用法</h3>
    <button @click="$refs.carousel0.setActiveItem(2)">set item 2</button>
    <button @click="$refs.carousel0.next()">next</button>
    <button @click="$refs.carousel0.prev()">prev</button>

    <tm-carousel ref="carousel0" :loop="false" :initial="2">
        <tm-carousel-item  v-for="item in items" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">async items</h3>
    <button @click="$refs.carousel.setActiveItem(2)">set item 2</button>
    <button @click="$refs.carousel.next()">next</button>
    <button @click="$refs.carousel.prev()">prev</button>

    <tm-carousel height="6rem" :direction="direction" @change="handleChange" ref="carousel">
        <tm-carousel-item  v-for="item in asyncItems" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">initial name</h3>

    <tm-carousel initial="hello" :direction="direction">
        <tm-carousel-item  v-for="item in items" :key="item.name" :name="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">initial index</h3>

    <tm-carousel :initial="3" :direction="direction">
        <tm-carousel-item  v-for="item in items" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">loop false</h3>

    <tm-carousel :loop="false" :direction="direction">
        <tm-carousel-item  v-for="item in items" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">autoplay</h3>
    <button @click="autoplay = !autoplay">toggle</button>

    <tm-carousel :autoplay="autoplay" :direction="direction">
        <tm-carousel-item  v-for="item in items" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">interval 1500</h3>

    <tm-carousel :interval="1500" autoplay :direction="direction">
        <tm-carousel-item  v-for="item in items" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>

    <h3 class="text-center">disabledTouch</h3>

    <tm-carousel disabled-touch autoplay :direction="direction">
        <tm-carousel-item  v-for="item in items" :key="item.name">
            <div class="swiper" :class="item.classes">{{ item.name }}</div>
        </tm-carousel-item>
    </tm-carousel>
</div>
</template>

<script>
import img1 from './images/img1.jpg'
import img2 from './images/img2.jpg'
import img3 from './images/img3.jpg'
import img4 from './images/img4.jpg'

export default {
    data () {
        return {
            loop: true,
            autoplay: true,
            current: 0,
            currentStr: '1',
            img1,
            img2,
            img3,
            img4,
            direction: sessionStorage.getItem('carousel-direction') || 'horizontal',

            items: [
                { name: '1', classes: 'swiper-blue' },
                { name: '2', classes: 'swiper-yellow' },
                { name: 'hello', classes: 'swiper-pink' },
                // { name: '4', classes: 'swiper-yellow' },
            ],
            asyncItems: [],
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

    methods: {
        handleDirectionChange () {
            sessionStorage.setItem('carousel-direction', this.direction === 'vertical' ? 'horizontal' : 'vertical')
            location.reload()
        },
        handleChange (...val) {
            console.log('change', val)
        }
    },
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
