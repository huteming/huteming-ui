import { Vue, Component } from 'vue-property-decorator'
import { MinxinModal, ModalOptions, clickModal } from '../types'
import { openModal, closeModal } from './main'

@Component({
    name: 'MixinModal',
})
export default class MixinModal extends Vue implements MinxinModal {
    // eslint-disable-next-line
    $_openModal (options?: ModalOptions | clickModal, brotherElement?: Element) {
        return openModal(options, brotherElement)
    }
    // eslint-disable-next-line
    $_closeModal (options?: ModalOptions) {
        return closeModal(options)
    }
}
