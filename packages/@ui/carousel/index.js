import _Carousel from './src/carousel.vue'
import _CarouselItem from 'web-ui/carousel-item/index.js'

_Carousel.install = (Vue) => {
    Vue.component(_Carousel.name, _Carousel)
}
_Carousel.item = _CarouselItem

export const TmCarousel = _Carousel
export const TmCarouselItem = _CarouselItem

export default _Carousel
