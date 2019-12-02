import CompIcon from './icon'
import { Icon } from '../types'

CompIcon.install = function (Vue) {
    Vue.component(CompIcon.registName, CompIcon)
}

export default CompIcon
