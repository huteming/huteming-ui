import Card from './card'
import CardPosterBar from './card-poster-bar'
import { installComponent } from 'utils/tools'
const installPosterBar = installComponent('CardPosterBar', CardPosterBar)
const installCard = installComponent('Card', Card)

CardPosterBar.install = installPosterBar
Card.PosterBar = CardPosterBar
Card.install = function (Vue) {
  installCard(Vue)
  installPosterBar(Vue)
}

export default Card
