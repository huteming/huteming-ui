import { Prop, Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import { IconProps } from '../types'
import '@huteming/ui-styles/src/main'

@Component
export default class TmIcon extends tsx.Component<IconProps> {
    registName = 'TmIcon'

    render () {
        return <i class={ this.classes }></i>
    }

    @Prop({ type: String, required: true })
    icon!: string

    get classes () {
        return ['tm-icon', `tm-icon-${this.icon}`]
    }
}
