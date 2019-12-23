import Vue from 'vue'

export type CarouselType = 'card' | ''

export interface Carousel extends Vue {
  $el: HTMLDivElement
  direction: string
  updateItems: () => void
  setActiveItem: (name: string | number) => boolean
  children: CarouselItem[]
  loop: boolean
  type: CarouselType
}

export interface CarouselItem extends Vue {
  name: string
  translateItem: (index: number, activeIndex: number, oldIndex: number) => void
  moveItem: (index: number, activeIndex: number, move: number, direction: boolean) => void
}
