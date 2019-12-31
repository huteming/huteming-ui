import ImagePicker from './directive'
import Vue from 'vue'

export default Object.assign(ImagePicker, {
  install (vue: typeof Vue) {
    vue.directive(ImagePicker.registName, ImagePicker)
  },
})
