import _Carousel from './src/carousel.vue'
import _CarouselItem from 'web-ui/carousel-item/index'

(_Carousel as any).install = (Vue: any) => {
    Vue.component(_Carousel.name, _Carousel)
}
(_Carousel as any).item = _CarouselItem

export const TmCarousel = _Carousel
export const TmCarouselItem = _CarouselItem

export default _Carousel
