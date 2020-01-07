import { ThemeTag } from '../../types'
import themeFont from './font'
import themeColor from './color'

export default <ThemeTag>{
  colorDefault: themeColor['gray-6'],
  colorPrimary: themeColor['blue'],
  colorSuccess: themeColor['green'],
  colorDanger: themeColor['red'],
  colorWarning: themeColor['orange'],
}
