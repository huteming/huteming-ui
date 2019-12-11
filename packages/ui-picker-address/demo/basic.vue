<template>
<div class="page-demo">
    <div class="location" @click="visible = true">
        <span class="location-label">所在地区</span>

        <div :class="isValidText ? 'location-field' : 'location-placeholder'">
            <span>{{ showText }}</span>
        </div>

        <img src="./images/arrow.png" alt="" class="location-arrow">

        <TmPickerAddress :visible.sync="visible" v-model="values" :value-text.sync="valuesText" />
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            visible: false,

            values: [],
            valuesText: [],
        }
    },

    computed: {
        isValidText () {
            return this.valuesText.filter(item => !!item).length
        },
        showText () {
            return this.isValidText ? this.valuesText.join(' ') : '请选择'
        },
    },
}
</script>

<style lang="scss" scoped>
.location {
    margin-bottom: .4rem;
    padding: .32rem .4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgba(231, 231, 234, 1);
    background: #fff;
    box-sizing: border-box;

    &-label {
        font-size: .3rem;
        line-height: .42rem;
        color: rgba(40, 43, 36, 1);
    }

    &-field, &-placeholder {
        flex: 1;
        width: 4rem;
        color: rgba(32, 38, 49, 1);
        font-size: .3rem;
        line-height: .42rem;
        text-align: right;
        border: none;
        outline: none;
    }

    &-placeholder {
        color: rgba(178, 186, 196, 1);
    }

    &-arrow {
        margin-left: .08rem;
        width: .1rem;
        height: .22rem;
    }
}
</style>
