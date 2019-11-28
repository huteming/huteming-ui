import Carousel from './carousel'
import CarouselItem from './carousel-item'

Carousel.install = (Vue) => {
    Vue.component(Carousel.registName, Carousel)
}
CarouselItem.install = (Vue) => {
    Vue.component(CarouselItem.registName, CarouselItem)
}

Carousel.item = CarouselItem

export default Carousel
