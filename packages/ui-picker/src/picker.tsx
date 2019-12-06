import { withStyles } from '@huteming/ui-styles/src/main'
import { Vue } from 'vue-property-decorator'

const styles = (styled: any) => {
    return {
        Root: styled('div', () => `
            width: 100%;
        `),
        Container: styled('div', () => `
            display: flex;
        `),
    }
}

class Picker extends Vue {
    render () {
        const { Root, Container } = this.styledDoms
        return (
            <Root class="tm-picker">
                <Container class="tm-picker-container">
                    { this.$slots.default }
                </Container>
            </Root>
        )
    }
}

export default withStyles(styles)(Picker, { name: 'TmPicker' })
