import Empty from './empty'
import { installComponent } from 'utils/tools'
import { ofType } from 'utils/component'
import { EmptyProps } from '../types'

Empty.install = installComponent('Empty', Empty)

export default ofType<EmptyProps>(Empty)
