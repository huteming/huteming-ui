import Image from './image'

Image.install = function (Vue) {
    Vue.component(Image.registName, Image)
}

export default Image
