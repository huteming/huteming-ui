import { Vue, Component, Mixins } from 'vue-property-decorator'
import Parent from './relationParent'
import Child from './relationChild'

@Component
export default class Relation extends Vue {
    render () {
        return (
            <Parent ref="parent"><Child ref="child"></Child></Parent>
        )
    }
}
