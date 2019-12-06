import Datetime from './datetime'

Datetime.install = function (Vue) {
    Vue.component(Datetime.registName, Datetime)
}

export default Datetime
