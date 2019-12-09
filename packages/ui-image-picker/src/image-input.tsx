import { withStyles } from '@huteming/ui-styles/src/main'
import { Vue, Prop } from 'vue-property-decorator'
import { HTMLInputEvent } from '../types'

const styles = (styled: any) => {
    return {
        Root: styled('input', () => `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 9999;
        `)
    }
}

class ImageInput extends Vue {
    render () {
        const { Root } = this.styledDoms
        return (
            <Root
                class="tm-image-picker"
                type="file"
                accept="image/*"
                ref="file"
                multiple={ this.multiple }
                on-change={ this.handleFileChange }
                disabled={ this.normalizedDisabled } />
        )
    }

    @Prop({ type: Boolean, default: false })
    multiple!: boolean

    @Prop({ type: Boolean, default: false })
    disabled!: boolean

    @Prop({ type: Number, default: Infinity })
    max!: number

    @Prop({ type: Function })
    onload: Function | undefined

    @Prop({ type: Function })
    onerror: Function | undefined

    get normalizedDisabled () {
        return (this.multiple && this.max <= 0) || this.disabled
    }

    handleFileChange (event: HTMLInputEvent) {
        /* istanbul ignore if */
        if (!event || !event.target || !event.target.files) return
        let files = Array.from(event.target.files)

        if (!files.length) return

        if (this.multiple) {
            files = files.slice(0, this.max)
        }

        this.preview(files)
            .then((result: string[] | ArrayBuffer[]) => {
                /* istanbul ignore else */
                if (typeof this.onload === 'function') {
                    this.onload(this.multiple ? result : result[0])
                }
            })
            .catch(err => {
                /* istanbul ignore else */
                if (typeof this.onerror === 'function') {
                    this.onerror(err)
                }
            })

        // fix 选中相同图片时，不触发 change 事件
        // event.target.value = ''
    }
    preview (files: File[]): Promise<(string | ArrayBuffer)[]> {
        const promises = files.map(file => this.previewSingle(file))
        return Promise.all(promises)
    }
    previewSingle (file: File): Promise<string | ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = function () {
                if (!reader.result) {
                    return reject(new Error('上传图片有误'))
                }
                resolve(reader.result)
            }

            reader.onerror = function (event) {
                reject(event)
            }

            reader.readAsDataURL(file)
        })
    }
}

export default withStyles(styles)(ImageInput, { name: 'TmImageInput' })
