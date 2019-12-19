<template>
  <div class="vnode" :key="key">
    <div class="vnode-field">
      <div class="vnode-decrease" @click="handleDecrease">-</div>
      <div class="vnode-input">
        <input :value="state.num" style="width: 100%;" />
      </div>
      <div class="vnode-add" @click="handleAdd">+</div>
    </div>

    <div class="vnode-tip">（VIP学习卡每次只能赠送一张）</div>
  </div>
</template>

<script>
import store from './store'

export default {
  data () {
    return {
      num: 1,
      state: store.state,
      key: Math.random(),
    }
  },

  methods: {
    handleInput (num) {
      store.state.num = num
    },
    handleAdd () {
      console.log('add')
      store.state.num++
    },
    handleDecrease () {
      console.log('de')
      store.state.num--
    },
  },
}
</script>

<style lang="scss" scoped>
.vnode {
    &-field {
        display: flex;
    }
    &-input {
        width: 115px;
        height: 40px;
        padding: 7px 10px;
        font-size: 18px;
        color: #202631;
        box-sizing: border-box;
        border-top: 1px solid #E4E4E4;
        border-bottom: 1px solid #E4E4E4;
    }

    &-decrease,
    &-add {
        width: 40px;
        height: 40px;
        font-size: 20px;
        line-height: 40px;
        color: #E4E4E4;
        text-align: center;
        border: 1px solid #E4E4E4;
        box-sizing: border-box;
    }

    &-tip {
        margin-top: 12px;
        font-size: 12px;
        line-height: 16px;
        color: #FF6878;
    }
}
</style>
