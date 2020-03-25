import TmToast from './utils'
import { Toast } from '../types'
import { installPrototype } from 'utils/tools'

(TmToast as Toast).install = installPrototype('$toast', TmToast)

export default TmToast as Toast
