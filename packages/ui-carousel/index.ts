import _Carousel from './src/carousel.vue'
import _CarouselItem from 'packages/ui-carousel-item/index'

_Carousel.install = (Vue: any) => {
    Vue.component(_Carousel.name, _Carousel)
}
_Carousel.item = _CarouselItem

export const TmCarousel = _Carousel
export const TmCarouselItem = _CarouselItem

export default _Carousel
