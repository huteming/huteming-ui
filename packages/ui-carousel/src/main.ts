import Carousel from './carousel'
import CarouselItem from './carousel-item'
import { installComponent } from 'utils/tools'

const installCarousel = installComponent('Carousel', Carousel)
const installItem = installComponent('CarouselItem', CarouselItem)

CarouselItem.install = installItem

Carousel.install = function (Vue) {
  installCarousel(Vue)
  installItem(Vue)
}
Carousel.item = CarouselItem

export default Carousel
