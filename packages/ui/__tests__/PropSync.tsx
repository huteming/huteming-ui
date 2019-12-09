import { Vue, Component, Watch } from 'vue-property-decorator'
import PropSync from '../src/utils/PropSync'

@Component
export default class TestPropSync extends Vue {
    render () {
        return (
            <div>hello PropSync</div>
        )
    }

    @PropSync('out')
    in: any

    @Watch('in')
    onInChange (val: any) {
        this.$emit('changeIn')
    }

    @Watch('out')
    onOutChange (val: any) {
        this.$emit('changeOut')
    }
}
