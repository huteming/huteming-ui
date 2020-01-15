import TmToast from './utils'
import { Toast } from '../types'

(TmToast as Toast).install = function (Vue) {
  Vue.prototype.$toast = TmToast
}

export default TmToast as Toast
