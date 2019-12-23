<template>
  <div class="page-demo">
    <demo-divider>卡片样式</demo-divider>
    <tm-carousel class="swiper" type="card">
      <tm-carousel-item v-for="item in 5" :key="`card-${item}`" class="swiper-item">{{ item }}</tm-carousel-item>
    </tm-carousel>

    <button @click="handleDirectionChange">toggle direction: {{ direction }}</button>

    <demo-divider>基础用法</demo-divider>
    <button @click="$refs.carousel0.setActiveItem(2)">set item 2</button>
    <button @click="$refs.carousel0.next()">next</button>
    <button @click="$refs.carousel0.prev()">prev</button>

    <tm-carousel ref="carousel0">
      <tm-carousel-item  v-for="item in items" :key="item.name">
        <div class="swiper" :class="item.classes">{{ item.name }}</div>
      </tm-carousel-item>
    </tm-carousel>

    <demo-divider>异步的子项</demo-divider>
    <tm-carousel>
      <tm-carousel-item  v-for="item in asyncItems" :key="item.name">
        <div class="swiper" :class="item.classes">{{ item.name }}</div>
      </tm-carousel-item>
    </tm-carousel>

    <demo-divider>按name属性初始化</demo-divider>
    <tm-carousel initial="hello" :direction="direction">
      <tm-carousel-item  v-for="item in items" :key="item.name" :name="item.name">
        <div class="swiper" :class="item.classes">{{ item.name }}</div>
      </tm-carousel-item>
    </tm-carousel>

    <demo-divider>按默认排序初始化</demo-divider>
    <tm-carousel :initial="1" :direction="direction">
      <tm-carousel-item  v-for="item in items" :key="item.name">
        <div class="swiper" :class="item.classes">{{ item.name }}</div>
      </tm-carousel-item>
    </tm-carousel>

    <demo-divider>自动播放</demo-divider>
    <button @click="autoplay = !autoplay">toggle</button>

    <tm-carousel :autoplay="autoplay" :direction="direction">
      <tm-carousel-item  v-for="item in items" :key="item.name">
        <div class="swiper" :class="item.classes">{{ item.name }}</div>
      </tm-carousel-item>
    </tm-carousel>

    <demo-divider>禁止手势滑动</demo-divider>
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
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper {
  line-height: 200px;
  text-align: center;

  &-container {
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  &-item:nth-child(2n) {
    background-color: #99a9bf;
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
