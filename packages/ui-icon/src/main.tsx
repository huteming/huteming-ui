import { Component, Prop } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import { IconProps } from '../types'

@Component({
    name: 'TmIcon',
})
export default class TmIcon extends tsx.Component<IconProps> {
    render () {
        return <i class={ this.classes }></i>
    }

    @Prop({ type: String, required: true })
    icon!: string

    get classes () {
        return ['tm-icon', `tm-icon-${this.icon}`]
    }
}
