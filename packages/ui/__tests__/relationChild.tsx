import { ChildrenMixin } from '../src/mixins/relation'
import { Vue, Component, Mixins } from 'vue-property-decorator'

@Component
export default class Child extends Mixins(ChildrenMixin('test')) {
    render () {
        return (
            <div>child</div>
        )
    }
}
