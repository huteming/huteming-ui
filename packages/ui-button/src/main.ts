import Button from './button'

Button.install = (Vue) => {
  Vue.component(Button.registName, Button)
}

export default Button
