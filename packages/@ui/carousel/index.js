import _Carousel from './src/carousel.vue'

_Carousel.install = (Vue) => {
    Vue.component(_Carousel.name, _Carousel)
}

export default _Carousel
