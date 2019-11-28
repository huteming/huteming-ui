import Vue from 'vue'

export interface Carousel extends Vue {
    $el: HTMLDivElement
    direction: string
    updateItems: () => void
    children: CarouselItem[]
    loop: boolean
}

export interface CarouselItem extends Vue {
    name: string
    translateItem: (index: number, activeIndex: number, oldIndex: number) => void
    moveItem: (index: number, activeIndex: number, move: number, direction: boolean) => void
}
