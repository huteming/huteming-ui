import { Prop, Vue } from 'vue-property-decorator'
import { DescribedComponent } from 'packages/ui-styles/src/main'
import { Root } from './vars'

@DescribedComponent({
  name: 'Icon',
})
export default class TmIcon extends Vue {
  render () {
    return <Root class={ this.classes } loading={ this.icon === 'loading' }></Root>
  }

  @Prop({ type: String, required: true })
  icon!: string

  get classes () {
    // 这里样式前缀固定，因为字体文件样式不能动态修改前缀
    return ['tm-icon', `tm-icon-${this.icon}`]
  }
}
