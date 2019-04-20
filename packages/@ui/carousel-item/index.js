
import _CarouselItem from 'web-ui/carousel/src/carousel-item.vue'

_CarouselItem.install = (Vue) => {
    Vue.component(_CarouselItem.name, _CarouselItem)
}

export default _CarouselItem
