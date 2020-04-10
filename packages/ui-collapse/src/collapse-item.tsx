import TmTransitionCollapse from 'packages/ui-transition-collapse/src/main'
import TmIcon from 'packages/ui-icon/src/main'
import { generateId } from 'packages/ui-tools/src/main'
import { Prop, Mixins } from 'vue-property-decorator'
import { DescribedComponent, createBEM } from 'packages/ui-styles/src/main'
import { ChildrenMixin } from 'mixins/relation'
import { ItemRoot, Header, Title, Icon, Wrap, Content } from './work'
const bem = createBEM('collapse')

@DescribedComponent({
  name: 'CollapseItem',
})
export default class CollapseItem extends Mixins(ChildrenMixin('collapse')) {
  render () {
    const DomHeader = (() => {
      return this.$slots.header || <Title disabled={ this.disabled }>{ this.header }</Title>
    })()
    const DomIcon = (() => {
      if (this.$slots.default || this.disabled) {
        return <Icon disabled={ this.disabled } active={ this.isActive }>
          <TmIcon icon={ this.disabled ? 'lock' : 'arrow_forward' } />
        </Icon>
      }
    })()
    return (
      <ItemRoot class={ bem('wrap') }>
        <Header class={ bem('header') } on-click={ this.handleClick }>
          { DomHeader }
          { DomIcon }
        </Header>

        <TmTransitionCollapse>
          <Wrap class={ bem('container') } v-show={ this.isActive }>
            <Content>{ this.$slots.default }</Content>
          </Wrap>
        </TmTransitionCollapse>
      </ItemRoot>
    )
  }

  @Prop({
    default () {
      return generateId()
    },
  })
  name!: string | number

  @Prop()
  header!: string

  @Prop({ type: Boolean, default: false })
  disabled!: boolean

  get isActive () {
    return (this.parent.activeNames as any).includes(this.name)
  }

  handleClick (event: Event) {
    event.stopPropagation()

    if (!this.disabled && this.$slots.default) {
      this.parent.change(this.name)
    }

    this.$emit('click', this.isActive)
  }
}
