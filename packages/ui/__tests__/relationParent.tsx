import { ParentMixin } from '../src/mixins/relation'
import { Vue, Component, Mixins } from 'vue-property-decorator'

@Component
export default class Parent extends Mixins(ParentMixin('test')) {
    render () {
        return (
            <div>{ this.$slots.default }</div>
        )
    }
}
