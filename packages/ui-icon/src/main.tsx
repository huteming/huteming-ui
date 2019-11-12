import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
    name: 'TmIcon',
})
export default class TmIcon extends Vue {
    render () {
        return <i class={ this.classes }></i>
    }

    @Prop({ type: String, required: true })
    icon!: string

    get classes () {
        return ['tm-icon', `tm-icon-${this.icon}`]
    }
}
