import { mount } from '@vue/test-utils'
import TmCarousel from 'web-ui/carousel/src/carousel'
import TmCarouselItem from 'web-ui/carousel/src/carousel-item'
import assert from 'assert'

describe('carousel', () => {
    it('create', () => {
        const wrapper = mount({
            template: `
                <tm-carousel>
                    <tm-carousel-item v-for="item in 3" :key="item">{{ item }}</tm-carousel-item>
                </tm-carousel>
            `,
            components: {
                TmCarousel,
                TmCarouselItem,
            },
        })
        const wrapperItem = wrapper.findAll('.tm-carousel-item')
        assert.strictEqual(wrapperItem.length, 3)
    })
})
