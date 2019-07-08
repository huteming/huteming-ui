<template>
<input
    class="tm-image-picker"
    type="file"
    accept="image/*"
    ref="file"
    :multiple="multiple"
    @change="handleFileChange"
    :disabled="normalizedDisabled" />
</template>

<script>
export default {
    props: {
        multiple: Boolean,
        onload: Function,
        onerror: Function,
    },

    data () {
        return {
            max: Infinity,
            disabled: false,
        }
    },

    computed: {
        normalizedDisabled () {
            return (this.multiple && this.max <= 0) || this.disabled
        },
    },

    methods: {
        handleFileChange (event) {
            let files = Array.from(event.target.files)

            if (!files.length) return

            if (this.multiple) {
                if (this.max) {
                    files = files.slice(0, this.max)
                }
            } else {
                files = files[0]
            }

            this.preview(files)
                .then(this.onload)
                .catch(this.onerror)

            event.target.value = '' // fix 选中相同图片时，不触发 change 事件
        },
        preview (files) {
            if (Array.isArray(files)) {
                const promises = files.map(file => this.previewSingle(file))
                return Promise.all(promises)
            }

            return this.previewSingle(files)
        },
        previewSingle (data) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()

                reader.onload = function () {
                    resolve(reader.result)
                }

                reader.onerror = function (event) {
                    reject(event)
                }

                reader.readAsDataURL(data)
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.tm-image-picker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 9999;
}
</style>
