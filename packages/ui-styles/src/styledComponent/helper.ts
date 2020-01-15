import { StyleHelper } from '../../types'

export default <StyleHelper>{
  autofit (px: number) {
    return document.documentElement.clientWidth / 750 * px
  },
}
