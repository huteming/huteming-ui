import modalManager from './modal-manager.js'
let modalID = 1

export default {
    data () {
        return {
            modalID: 1,
        }
    },

    created () {
        this.modalID = modalID++
    },

    methods: {
        /**
         * 打开时，传入一个id，若id不存在，创建一个dom[modal]
         */
        $_openModal (options, brotherElement) {
            if (typeof options === 'function') {
                options = {
                    callbackClick: options
                }
            }

            return modalManager.open(this.modalID, options, brotherElement)
        },
        $_closeModal (options) {
            return modalManager.close(this.modalID, options)
        },
    },
}
