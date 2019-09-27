import { createDecorator } from 'vue-class-component'
import Vue, { PropOptions } from 'vue'
import { Constructor } from 'vue/types/options'

// props: {
//     test: String,
// },

// data () {
//     return {
//         testSync: this.test
//     }
// },

// watch: {
//     test (val) {
//         this.testSync = val
//     },
//     testSync (val) {
//         this.$emit('update:test', val)
//     },
// },

export function PropSync (propName: string, options: PropOptions | Constructor[] | Constructor = {}): PropertyDecorator {
    return (target: Vue, k: string) => {
        createDecorator((componentOptions, attrName) => {
            concatProps(componentOptions, propName, options)
            concatData(componentOptions, propName, attrName)
            concatWatch(componentOptions, propName, attrName)
        })(target, k)
    }
}

function concatWatch (componentOptions: any, propName: string, attrName: string) {
    componentOptions.watch = componentOptions.watch || {}

    const watch: any = componentOptions.watch
    const _watches = [
        {
            key: propName,
            handler (this: Vue, value: any) {
                (this as any)[attrName] = value
            },
        },
        {
            key: attrName,
            handler (this: Vue, value: any) {
                this.$emit(`update:${propName}`, value)
            },
        },
    ]

    _watches.forEach(({ key, handler }) => {
        if (typeof watch[key] === 'object' && !Array.isArray(watch[key])) {
            watch[key] = [watch[key]]
        } else if (typeof watch[key] === 'undefined') {
            watch[key] = []
        }

        watch[key].push(handler)
    })
}

function concatData (componentOptions: any, propName: string, attrName: string) {
    componentOptions.mixins = componentOptions.mixins || []

    const mixins = componentOptions.mixins

    mixins.push({
        data (this: Vue) {
            return {
                [attrName]: (this as any)[propName],
            }
        }
    })
}

function concatProps (componentOptions: any, propName: string, options: any): void {
    componentOptions.props = componentOptions.props || {}

    const props: any = componentOptions.props

    props[propName] = options
}
