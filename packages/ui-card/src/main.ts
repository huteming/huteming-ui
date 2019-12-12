import Card from './card'

Card.install = function (Vue) {
  Vue.component(Card.registName, Card)
}

export default Card
