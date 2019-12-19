<template>
  <section class="page-demo">
    <div class="container">
      <img :src="board" alt="" class="img-block" ref="table">
      <img :src="pointer" alt="" class="pointer" ref="pointer">
    </div>
    <button @click="handleStart">start</button>
    <button @click="handleStop">end</button>
    <button @click="mockerror">测试异常</button>
  </section>
</template>

<script>
import board from './images/board.png'
import pointer from './images/pointer.png'
import pointer2 from './images/pointer@2.png'
import Rotate from '../src/main'

export default {
  data () {
    return {
      initial: 0,
      disabled: false,

      board,
      pointer,
      pointer2,
      ranges: [
        { value: 'a', angle: 15 },
        { value: '谢谢', angle: 30 },
        { value: '空1', angle: 30 },
        { value: '加油', angle: 30 },
        { value: '三', angle: 30 },
        { value: '运气', angle: 30 },
        { value: '空2', angle: 30 },
        { value: '再接再厉', angle: 30 },
        { value: 'er', angle: 30 },
        { value: 'zhu nin', angle: 30 },
        { value: 'kong', angle: 30 },
        { value: 'buyao', angle: 30 },
        { value: 'b', angle: 15 },
      ],
    }
  },

  mounted () {
    this.rotate = new Rotate(this.ranges, {
      translate: (angle) => {
        console.log('tranll')
        this.$refs.table.style.transform = `rotate(${angle}deg)`
      },
      initial: 20,
      done (value) {
        console.log('end', value)
      },
    })
  },

  methods: {
    handleEnd (item) {
      console.log(item)
    },
    handleStart () {
      this.rotate.start()
    },
    handleStop () {
      this.rotate.stop()
    },
    mockerror () {
      this.handleStart()
      setTimeout(() => {
        console.log('异常啦')
        this.rotate.reset()
      }, 2000)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;
    overflow: hidden;
}

.pointer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: 50% 50%;
}
</style>
