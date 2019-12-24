import Typography from './typography'

Typography.install = function (Vue) {
  Vue.component(Typography.registName, Typography)
}

export default Typography
