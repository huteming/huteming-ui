<template>
<div class="page-example">
    <div class="waves ts-mock" v-ripple="{ disabled: disabled, color: '#000' }" @click="handleClick">Press me!</div>
    <div class="waves ts-btn" v-ripple="{ disabled: disabled, color: 'purple', opacity: 1 }">Press me!</div>
    <div class="waves ts-btn circle" v-ripple="{ disabled: disabled, center: true }">Press me!</div>

    <div class="waves ts-btn" @click="disabled = !disabled">disabled: {{ disabled.toString() }}</div>
    <!-- <div class="waves ts-btn" @click="handleColorChange">color: {{ color || 'default' }}</div> -->
</div>
</template>

<script>
export default {
    data () {
        return {
            disabled: false,
            color: 'purple',
        }
    },

    methods: {
        handleClick () {
            console.log('click basic')
            // this.$router.push('/example')
        },
        handleColorChange () {
            if (!this.color) {
                this.color = 'purple'
                return
            }
            if (this.color === 'purple') {
                this.color = 'blue'
                return
            }
            this.color = ''
        },
        handleTouchstart (event) {
            console.log('outside touchstart: ', event)
        },
    },
}
</script>

<style lang="scss" scoped>
.waves {
    position:relative;
    cursor:pointer;
    display:inline-block;
    overflow:hidden;
    text-align: center;
    -webkit-tap-highlight-color:transparent;
    z-index:1;
}

.ts-mock {
    width: 33%;
    height: 60px;
    // background: #fff;
    // background-color: #fff;
    // background: rgba(255, 255, 255, 1);
    // background: rgba(255, 255, 255, 0);
    // background: rgb(255, 255, 255);
    // opacity: 1;
    // opacity: 0;
}

.ts-btn {
    width: 200px;
    height: 56px;
    line-height: 56px;
    background: #f57035;
    color: #fff;
    border-radius: 5px;

    &.circle {
        width: 56px;
        border-radius: 50%;
    }
}
</style>
