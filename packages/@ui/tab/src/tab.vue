<script>
import AppNavbar from './components/navbar'
import AppContent from './components/content'
import TabPane from './tab-pane'

export default {
    name: 'TmTab',

    props: {
        value: String,
        classPane: String,
        classNavbar: String,
        classContent: String,

        // 三个 flex 布局属性，应用于 navbar 及 pane
        justify: {
            type: String,
            default: 'start',
            validator (val) {
                return ['start', 'center', 'end', 'between', 'around'].indexOf(val) > -1
            },
        },
        align: {
            type: String,
            default: 'center',
            validator (val) {
                return ['start', 'center', 'end', 'baseline', 'stretch'].indexOf(val) > -1
            },
        },
        // flex 布局的 flex-grow 属性
        grow: {
            type: Number,
            default: 0,
        },
    },

    data () {
        return {
            active: this.value
        }
    },

    computed: {
        classesNavbar () {
            return {
                [`is-justify-${this.justify}`]: true,
                [`is-align-${this.align}`]: true,
            }
        },
    },

    watch: {
        value (val) {
            this.active = val
        },
        active (val) {
            this.$emit('input', val)

            this.$nextTick(() => {
                this.$emit('change', val)
            })
        },
    },

    methods: {
        handleChange (name) {
            this.active = name
        }
    },

    mounted () {
    },

    render (h) {
        const { classPane, classNavbar, classContent, grow, active, classesNavbar } = this
        const panes = this.$slots.default.filter(item => /TabPane/.test(item.tag))
        const containers = this.$slots.default.filter(item => /TabContainer/.test(item.tag))

        containers
            .filter(item => {
                const { icon, title } = item.data.attrs
                if (!icon && !title) {
                    return false
                }

                const nameContainer = item.componentOptions.propsData.name

                return !panes.find(item => item.componentOptions.propsData.name === nameContainer)
            })
            .forEach(item => {
                const { icon, title } = item.data.attrs
                const name = item.componentOptions.propsData.name

                panes.push((
                    <TabPane icon={ icon } title={ title } name={ name } class={ classPane } />
                ))
            })

        panes.sort((prev, next) => {
            const namePrev = prev.componentOptions.propsData.name
            const nameNext = next.componentOptions.propsData.name

            const indexPrev = containers.findIndex(item => item.componentOptions.propsData.name === namePrev)
            const indexNext = containers.findIndex(item => item.componentOptions.propsData.name === nameNext)

            return indexPrev - indexNext
        })

        const navbar = (
            <app-navbar class={ [classNavbar, classesNavbar] } value={ active } grow={ grow } onChange={ this.handleChange }>
                { panes }
            </app-navbar>
        )

        const content = (
            <app-content class={ classContent } value={ active }>
                { containers }
            </app-content>
        )

        return (
            <section class="tm-tab">
                { navbar }
                { content }
            </section>
        )
    },

    components: {
        AppNavbar,
        AppContent,
    },
}
</script>

<style lang="scss" scoped>
.tm-tab {
    width: 100%;
    overflow: hidden;
}

/* align */
.is-align-start {
    align-items: flex-start;
}

.is-align-center {
    align-items: center;
}

.is-align-end {
    align-items: flex-end;
}

.is-align-baseline {
    align-items: baseline;
}

.is-align-stretch {
    align-items: stretch;
}

/* justify */
.is-justify-start {
    justify-content: flex-start,
}

.is-justify-center {
    justify-content: center,
}

.is-justify-end {
    justify-content: flex-end,
}

.is-justify-between {
    justify-content: space-between,
}

.is-justify-around {
    justify-content: space-around,
}
</style>
