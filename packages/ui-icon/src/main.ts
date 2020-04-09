import CompIcon from './icon'
import { installComponent } from 'utils/tools'
import { ofType } from 'utils/component'
import { IconProps } from '../types'

CompIcon.install = installComponent('Icon', CompIcon)

export default ofType<IconProps>(CompIcon)
