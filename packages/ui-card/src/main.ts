import Card from './card'
import CardPosterBar from './card-poster-bar'

CardPosterBar.install = function (Vue) {
  Vue.component(CardPosterBar.registName, CardPosterBar)
}

Card.PosterBar = CardPosterBar

Card.install = function (Vue) {
  Vue.component(Card.registName, Card)
  Vue.use(Card.PosterBar)
}

export default Card
