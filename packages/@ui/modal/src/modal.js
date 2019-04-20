import modalManager from './modal-manager.js'

export default {
    data () {
        return {
            modalID: 1,
        }
    },

    created () {
        this.modalID++
    },

    methods: {
        /**
         * 打开时，传入一个id，若id不存在，创建一个dom[modal]
         */
        $_openModal (options, element) {
            if (typeof options === 'function') {
                options = {
                    callbackClick: options
                }
            }

            modalManager.open(this.modalID, options, element)
        },
        $_closeModal (options) {
            modalManager.close(this.modalID, options)
        },
    },
}
